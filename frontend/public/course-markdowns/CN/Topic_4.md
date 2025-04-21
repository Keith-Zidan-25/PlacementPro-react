# Topic 4: IP Addressing and Subnetting

### Learning Objectives:
* Learn how IP addresses work  
* Perform basic subnetting and understand CIDR  

## Concept Overview:
**IP Address**: Unique ID assigned to each device on a network.  
* IPv4 = 32-bit, e.g., `192.168.0.1`  
* IPv6 = 128-bit, e.g., `2001:db8::ff00:42:8329`  

## Subnetting:
Divides a network into smaller parts to improve management and security.

**Example Problem**:  
Given IP: `192.168.1.0/24`  
* Subnet Mask: `255.255.255.0`
* Hosts: `2^8 - 2 = 254`  
* First IP: `192.168.1.1`, Last: `192.168.1.254`

## Address Classes:
| Class | Range | Default Subnet Mask |
|-------|-------|----------------------|
| A | 1.0.0.0 - 126.255.255.255 | 255.0.0.0 |
| B | 128.0.0.0 - 191.255.255.255 | 255.255.0.0 |
| C | 192.0.0.0 - 223.255.255.255 | 255.255.255.0 |

## Tools:
* `ipconfig` (Windows) or `ifconfig` (Linux/macOS) to check IP  
* Online subnet calculators  

You can watch this video on [IP Addressing and Subnetting](https://youtu.be/OqsXzkXfwRw?si=a7GCvBEx14oFtjB8).
