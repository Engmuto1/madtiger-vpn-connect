VPN MVP

This project is a Minimum Viable Product (MVP) VPN that demonstrates how a Virtual Private Network works at its simplest level.
It allows a user to connect securely to a remote VPN server, encrypt their internet traffic, and mask their IP address.

📌 Features

Secure encrypted tunnel (using OpenVPN / WireGuard or SSH tunneling).

Connect/disconnect with one command.

Basic authentication (username & password or key file).

Simple configuration file for server details.

⚙️ Requirements

Server:

A Linux VPS (Ubuntu/Debian recommended).

Root or sudo access.

Installed VPN software (e.g., OpenVPN or WireGuard).

Client:

Windows, macOS, Linux, or Android/iOS.

Corresponding VPN client software.

🛠️ Setup Instructions
1. Clone the Repo
git clone https://github.com/yourusername/vpn-mvp.git
cd vpn-mvp

2. Server Setup (example with WireGuard)

On your server:

sudo apt update && sudo apt install wireguard -y


Generate server keys:

wg genkey | tee server_private.key | wg pubkey > server_public.key


Create /etc/wireguard/wg0.conf:

[Interface]
PrivateKey = <server_private.key>
Address = 10.0.0.1/24
ListenPort = 51820

[Peer]
PublicKey = <client_public.key>
AllowedIPs = 10.0.0.2/32


Start the VPN:

sudo wg-quick up wg0

3. Client Setup

Install WireGuard on your computer/phone.

Create a config file (e.g., client.conf):

[Interface]
PrivateKey = <client_private.key>
Address = 10.0.0.2/24

[Peer]
PublicKey = <server_public.key>
Endpoint = <your-server-ip>:51820
AllowedIPs = 0.0.0.0/0


Bring up the connection:

wg-quick up client

▶️ Usage

Run wg-quick up client to connect.

Run wg-quick down client to disconnect.

Verify with:

curl ifconfig.me


It should show your server’s IP.

🚀 Roadmap

Add multiple server locations.

Implement kill switch & split tunneling.

Build a simple desktop/mobile app to toggle VPN.
