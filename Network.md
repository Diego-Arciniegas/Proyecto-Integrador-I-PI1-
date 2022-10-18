# Network

## Switch ports

|Name VLAN      | VLAN    | Interface     | Port Range | Switchport |
|---------------|:-------:|:-------------:|:----------:|:----------:|
|Conexiones     | Default | FastEthernet  | 1 - 2      | Access     |
|Usuarios       | 2       | FastEthernet  | 3 - 5      | Access     |
|Administradores| 3       | FastEthernet  | 6 - 8      | Access     |
|Servidores     | 4       | FastEthernet  | 9 - 11     | Access     |
|               |         | FastEthernet  | 23 - 24    | Trunk      |


## Router ports

|Devices        | Interface        | Direction IPv4 | Direction IPv6  | Subnet Mask IPv4 |Subnet Mask IPv6 |IPv4 Default Gateway|IPv6 Default Gateway|
|---------------|:----------------:|:--------------:|:---------------:|:----------------:|:---------------:|:------------------:|:------------------:|
|Router         |serial 0/0/0      | 10.10.0.0      |2801:0:2E0:1::   |255.255.255.252   |/126             |10.10.0.1           | 2801:0:2E0:1::1    |
|               |FastEthernet 0/1  | 172.17.0.0     |2801:0:2E0:A::   |255.255.0.0       |/64              |                    | 2801:0:2E0:1::1    |
|               |FastEthernet 0/1.1| 172.17.10.0    |2801:0:2E0:A:A:: |255.255.255.0     |/80              |172.17.10.1         | 2801:0:2E0:A:A::1  |
|               |FastEthernet 0/1.2| 172.17.20.0    |2801:0:2E0:A:B:: |255.255.255.0     |/80              |172.17.20.1         | 2801:0:2E0:A:B::1  |
|               |FastEthernet 0/1.3| 172.17.30.0    |2801:0:2E0:A:C:: |255.255.255.0     |/80              |172.17.30.1         | 2801:0:2E0:A:C::1  |
|               |FastEthernet 0/1.4| 172.17.40.0    |2801:0:2E0:A:D:: |255.255.255.0     |/80              |172.17.40.1         | 2801:0:2E0:A:D::1  |
|VLAN           |Vlan1             | 172.17.10.0    |2801:0:2E0:A:A:: |255.255.255.0     |/80              |172.17.10.2         | 2801:0:2E0:A:A::2  |


## Router ports redirect

| Service/Application | Host (IPv4)    | Host (IPv6)      | Protocol | Port | Router port |
|---------------------|:--------------:|------------------|----------|------|-------------|
| Web catalog (HTTP)  | 172.17.40.3    | 2801:0:2E0:A:D::3| TCP      | 8000 | 80          |
| Web catalog (HTTPS) | 172.17.40.3    | 2801:0:2E0:A:D::3| TCP      | 8443 | 443         |
| SMTP                | 172.17.40.4    |2801:0:2E0:A:D::4 | TCP      | 25   | 25          |
| SMTPS               | 172.17.40.4    | 2801:0:2E0:A:D::4| TCP      | 465  | 465         |
| IMAP                | 172.17.40.3    | 2801:0:2E0:A:D::3| TCP      | 143  | 143         |
| IMAP (TLS)          | 172.17.40.3    | 2801:0:2E0:A:D::3| TCP      | 993  | 993         |
| POP3                | 172.17.40.4    | 2801:0:2E0:A:D::4| TCP      | 110  | 110         |
| POP3 (TLS)          | 172.17.40.4    | 2801:0:2E0:A:D::4| TCP      | 995  | 995         |
| DNS                 | 172.17.40.3    | 2801:0:2E0:A:D::3| UDP      | 53   | 53          |

## Topology

| Computer         | Services                      | VLAN | IPv6             | IPv6 mask | IPv6 Default Gateway     | Primary DNS server IPv6 | Secondary DNS server IPv6 | IPv4           | IPv4 mask | IPv4 Default Gateway | Primary DNS server IPv4 | Secondary DNS server IPv4 |
|------------------|:-------------------------------:|:------:|:------------------:|:-----------:|:--------------------------:|:------------------:|:----------------:|:----------------:|:-----------:|:----------------------:|:----------------:|:----------------:|
| Debian           | POP3, IMAP, SMTP              | 4  | 2801:0:2E0:A:D::4 | 80         | 2801:0:2E0:A:D::1        | 2801:0:2E0:A:D::3 | 2801:0:2E0:A:D::5| 172.17.40.4 | 24        | 172.17.40.1      | 172.17.40.3  |172.17.40.5  |
| Windows server 1 | HTTP, HTTPS, FTP, FTPS, Primary DNS | 4  | 2801:0:2E0:A:D::3 | 80   | 2801:0:2E0:A:D::1        | 2801:0:2E0:A:D::3 |2801:0:2E0:A:D::5| 172.17.40.3 | 24        | 172.17.40.1       | 172.17.40.3  |172.17.40.5  |
| Windows server 2 | Secundary DNS                 | 4  | 2801:0:2E0:A:D::5 | 80         | 2801:0:2E0:A:D::1        | 2801:0:2E0:A:D::3 |2801:0:2E0:A:D::5| 172.17.40.5 | 24        | 172.17.40.1       | 172.17.40.3  | 172.17.40.5  |

## DHCP

| Pool        | VLAN                    | Direction IPv4 | Direction IPv6    | IPv4 Default Gateway | IPv6 Default Gateway| Red IPv4| broadcast IPv4| Red IPv6 | broadcast IPv6| Excluded Addresses IPv4|  Primary DNS server IPv4 | Secondary DNS server IPv4 | Primary DNS server IPv6 | Secondary DNS server IPv6 |
|-----------------|:-------------------------:|:----------------:|:-------------------:|:----------------------:|:---------------------:|:----------------:|:-------------------:|:----------------------:|:---------------------:|:---------------------:|:-------------------:|:----------------------:|:---------------------:|---------------------:|
| Conexiones | Default                 |172.17.10.0/24  |2801:0:2E0:A:A::/80|172.17.10.1           |2801:0:2E0:A:A::1    |172.17.10.1|172.17.10.254|2801:0:2E0:A:A::1|2801:0:2E0:A:A:FFFF:FFFF:FFFF| 172.17.10.1 - 172.17.10.20|172.17.40.3  |172.17.40.5  |2801:0:2E0:A:D::3 | 2801:0:2E0:A:D::5|
| Usuarios     | 2                 |172.17.20.0/24  |2801:0:2E0:A:B::/80|172.17.20.1           |2801:0:2E0:A:B::1    |172.17.20.1|172.17.20.254|2801:0:2E0:A:B::1|2801:0:2E0:A:B:FFFF:FFFF:FFFF| 172.17.20.1 - 172.17.20.20|172.17.40.3  |172.17.40.5  |2801:0:2E0:A:D::3 | 2801:0:2E0:A:D::5|
| Administradores     | 3                 |172.17.30.0/24  |2801:0:2E0:A:C::/80|172.17.30.1           |2801:0:2E0:A:B::1    |172.17.30.1|172.17.30.254|2801:0:2E0:A:B::1|2801:0:2E0:A:B:FFFF:FFFF:FFFF| 172.17.30.1 - 172.17.30.20|172.17.40.3  |172.17.40.5  |2801:0:2E0:A:D::3 | 2801:0:2E0:A:D::5|
| Servidores    | 4                 |172.17.40.0/24  |2801:0:2E0:A:D::/80|172.17.40.1           |2801:0:2E0:A:D::1    |172.17.40.1|172.17.40.254|2801:0:2E0:A:D::1|2801:0:2E0:A:D:FFFF:FFFF:FFFF| 172.17.40.1 - 172.17.40.20|172.17.40.3  |172.17.40.5  |2801:0:2E0:A:D::3 | 2801:0:2E0:A:D::5|

## Primary zone domains

| Domain                  | Type       | IPv4           | IPv6             |
|-------------------------|:----------:|:--------------:|:----------------:|
| www.accesorios.autoupb.com  | A and AAAA | 172.17.40.3 | 2801:0:2E0:A:D::3 |
| ftp.accesorios.autoupb.com  | A and AAAA | 172.17.40.3 | 2801:0:2E0:A:D::3 |
| mail.accesorios.autoupb.com | A and AAAA | 172.17.40.4 | 2801:0:2E0:A:D::4 |
| mail.accesorios.autoupb.com | MX         | 172.17.40.4 | 2801:0:2E0:A:D::4 |
| servidor.accesorios.autoupb.com | A and AAAA | 172.17.40.5 | 2801:0:2E0:A:D::5 |

## Secondary zone

| Company           | Domain                 | DNS server IPv4  | DNS server IPv6  |
|-------------------|:----------------------:|:----------------:|:----------------:|
| Accesorios        | accesorios.autoupb.com | 172.17.40.5      |2801:0:2E0:A:D::5 |

## Scripts

### Router

```
--- Habilitar Ipv6

Router#config t
Router(config)#ipv6 unicast-routing

--- Config Serial (s0/0/0)

Router(config)#interface s0/0/0
Router(config-if)#ip address 10.10.0.1 255.255.255.252
Router(config-if)#ipv6 enable
Router(config-if)#ipv6 address 2801:0:2E0:1::1/126
Router(config-if)#no shutdown
Router(config-if)exit

--- Config Int (fa0/1)

Router(config)#int fa 0/1
Router(config-if)#no sh
Router(config-if)#exit

--- Config Subneting

Router(config)#int fa 0/1.1
Router(config-subif)#encapsulation dot1Q 1 native
Router(config-subif)#ip address 172.17.10.1 255.255.255.0
Router(config-subif)#ipv6 enable
Router(config-subif)#ipv6 address 2801:0:2E0:A:A::1/80
Router(config-subif)#no sh
Router(config-subif)#ip helper-address 172.17.40.2
Router(config-subif)#exit

Router(config)#int fa 0/1.2
Router(config-subif)#encapsulation dot1Q 2
Router(config-subif)#ip address 172.17.20.1 255.255.255.0
Router(config-subif)#ipv6 enable
Router(config-subif)#ipv6 address 2801:0:2E0:A:B::1/80
Router(config-subif)#no sh
Router(config-subif)#ip helper-address 172.17.40.2
Router(config-subif)#exit

Router(config)#int fa 0/1.3
Router(config-subif)#encapsulation dot1Q 3
Router(config-subif)#ip address 172.17.30.1 255.255.255.0
Router(config-subif)#ipv6 enable
Router(config-subif)#ipv6 address 2801:0:2E0:A:C::1/80
Router(config-subif)#no sh
Router(config-subif)#ip helper-address 172.17.40.2
Router(config-subif)#exit

Router(config)#int fa 0/1.4
Router(config-subif)#encapsulation dot1Q 4
Router(config-subif)#ip address 172.17.40.1 255.255.255.0
Router(config-subif)#ipv6 enable
Router(config-subif)#ipv6 address 2801:0:2E0:A:D::1/80
Router(config-subif)#no sh
Router(config-subif)#ip helper-address 172.17.40.2
Router(config-subif)#exit
Router(config)#exit

--- OSPF Ipv6 0

Router(config)#interface s0/0/0
Router(config-if)ipv6 ospf 1 area 0
Router(config-if)exit

--- OSPF Ipv4

Router #config t
Router(config)#router ospf 1
Router(config-router)#network 10.10.0.0 0.0.0.3 area 0
Router(config-router)#network 172.16.0.0 0.0.255.255 area 0
Router(config-router)#network 172.17.0.0 0.0.255.255 area 0
Router(config-router)#network 172.18.0.0 0.0.255.255 area 0
Router(config-router)#exit
Router(config)#exit

--- DCHP Ipv4

Router(config)#ip dhcp pool Conexiones
Router(dhcp-config)#network 172.17.10.0 255.255.255.0
Router(dhcp-config)#default-router 172.17.10.1
Router(dhcp-config)#dns-server 172.17.40.3 172.17.40.5
Router(dhcp-config)#exit

Router(config)#ip dhcp pool Administradores
Router(dhcp-config)#network 172.17.20.0 255.255.255.0
Router(dhcp-config)#default-router 172.17.20.1
Router(dhcp-config)#dns-server 172.17.40.3 172.17.40.5 
Router(dhcp-config)#exit

Router(config)#ip dhcp pool Usuarios
Router(dhcp-config)#network 172.17.30.0 255.255.255.0
Router(dhcp-config)#default-router 172.17.30.1
Router(dhcp-config)#dns-server 172.17.40.3 172.17.40.5
Router(dhcp-config)#exit

Router(config)#ip dhcp pool Servidores
Router(dhcp-config)#network 172.17.40.0 255.255.255.0
Router(dhcp-config)#default-router 172.17.40.1
Router(dhcp-config)#dns-server 172.17.40.3 172.17.40.5
Router(dhcp-config)#exit

Router(config)#ip dhcp excluded-address 172.17.10.1 172.17.10.20
Router(config)#ip dhcp excluded-address 172.17.20.1 172.17.20.20
Router(config)#ip dhcp excluded-address 172.17.30.1 172.17.30.20
Router(config)#ip dhcp excluded-address 172.17.40.1 172.17.40.20

--- DCHP Ipv6

Router(config)#int fa0/1.1
Router(config-subif)#ipv6 nd other-config-flag
Router(config-subif)#ipv6 nd managed-config-flag
Router(config-subif)#ipv6 dhcp server Conexiones
Router(config-subif)#exit

Router(config)#int fa0/1.2
Router(config-subif)#ipv6 nd other-config-flag
Router(config-subif)#ipv6 nd managed-config-flag
Router(config-subif)#ipv6 dhcp server Administradores
Router(config-subif)#exit

Router(config)#int fa0/1.3
Router(config-subif)#ipv6 nd other-config-flag
Router(config-subif)#ipv6 nd managed-config-flag
Router(config-subif)#ipv6 dhcp server Usuarios
Router(config-subif)#exit

Router(config)#int fa0/1.4
Router(config-subif)#ipv6 nd other-config-flag
Router(config-subif)#ipv6 nd managed-config-flag
Router(config-subif)#ipv6 dhcp server Servidores
Router(config-subif)#exit

Router(config)#ipv6 dhcp pool Conexiones
Router(config-dhcpv6)#address prefix 2801:0:2E0:A:A::1/80
Router(config-dhcpv6)#dns-server 2801:0:2E0:A:D::3
Router(config-dhcpv6)#dns-server 2801:0:2E0:A:D::5
Router(config-dhcpv6)#domain-name accesorios.autoupb.com
Router(config-dhcpv6)#exit

Router(config)#ipv6 dhcp pool Administradores
Router(config-dhcpv6)#address prefix 2801:0:2E0:A:B::1/80
Router(config-dhcpv6)#dns-server 2801:0:2E0:A:D::3
Router(config-dhcpv6)#dns-server 2801:0:2E0:A:D::5
Router(config-dhcpv6)#domain-name accesorios.autoupb.com
Router(config-dhcpv6)#exit

Router(config)#ipv6 dhcp pool Usuarios
Router(config-dhcpv6)#address prefix 2801:0:2E0:A:C::1/80
Router(config-dhcpv6)#dns-server 2801:0:2E0:A:D::3
Router(config-dhcpv6)#dns-server 2801:0:2E0:A:D::5
Router(config-dhcpv6)#domain-name accesorios.autoupb.com
Router(config-dhcpv6)#exit

Router(config)#ipv6 dhcp pool Servidores
Router(config-dhcpv6)#address prefix 2801:0:2E0:A:D::1/80
Router(config-dhcpv6)#dns-server 2801:0:2E0:A:D::3
Router(config-dhcpv6)#dns-server 2801:0:2E0:A:D::5
Router(config-dhcpv6)#domain-name accesorios.autoupb.com
Router(config-dhcpv6)#exit

Router(config)#ip host www.accesorios.autoupb.com 172.17.40.3
Router(config)#ipv6 host www.accesorios.autoupb.com 2801:0:2e0:a:d::3


```

### Switch

```
Switch(config)#vlan
Switch(config-vlan)#vlan 2
Switch(config-vlan)#name Administradores
Switch(config-vlan)#vlan 3
Switch(config-vlan)#name Usuarios
Switch(config-vlan)#vlan 4
Switch(config-vlan)#name Servidores
Switch(config)#int range  fa 0/3-5
Switch(config-if-range)#switchport mode access
Switch(config-if-range)#switchport access vlan 2
Switch(config-if-range)#exit
Switch(config)#int range fa 0/6-8
Switch(config-if-range)#switchport mode access
Switch(config-if-range)#switchport access vlan 3
Switch(config-if-range)#exit
Switch(config)#int range fa 0/9-11
Switch(config-if-range)#switchport mode access
Switch(config-if-range)#switchport access vlan 4
Switch(config-if-range)#exit
Switch(config)#int range fa 0/23-24
Switch(config-if-range)#switchport mode trunk
Switch(config-if-range)#switchport trunk allowed vlan 1-4
Switch(config-if-range)#exit
Switch(config)#int vlan1
Switch(config-if)#ip address 172.17.10.2 255.255.255.0
Switch(config-if)#no sh
Switch(config-if)#exit
Switch(config)#exit

```
