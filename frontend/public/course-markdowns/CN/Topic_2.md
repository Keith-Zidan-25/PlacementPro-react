# Topic 2: OSI Model

### Learning Objectives:
* Understand the 7 layers of the OSI model  
* Learn the role of each layer in network communication  

## Concept Overview:
The **OSI (Open Systems Interconnection)** model is a theoretical framework that standardizes the functions of a telecommunication or computing system into 7 abstraction layers.  
Each layer communicates with the layers directly above and below it.

## OSI Layers Explained:
| Layer | Function | Protocols/Examples |
|-------|----------|--------------------|
| 7. Application | Interface for user applications | HTTP, FTP, SMTP |
| 6. Presentation | Data formatting, encryption, compression | JPEG, SSL, MPEG |
| 5. Session | Maintains communication sessions | NetBIOS, RPC |
| 4. Transport | Reliable data delivery | TCP, UDP |
| 3. Network | Routing, addressing | IP, ICMP |
| 2. Data Link | MAC addressing, error detection | Ethernet, PPP |
| 1. Physical | Physical transmission | Cables, Hubs, NIC |

## Mnemonic:
> “Please Do Not Throw Sausage Pizza Away” (Layer 1 to 7)

## Real-World Flow:
When a user sends an email:
* **Application Layer**: Email client (Gmail)  
* **Transport Layer**: TCP ensures message integrity  
* **Network Layer**: IP routes the message  
* **Physical Layer**: Data sent over Ethernet or Wi-Fi  

## OSI Diagram:
![OSI Diagram](/course-markdowns/Networks/images/osi_model.png)

You can watch this video on [OSI Model](https://youtu.be/vv4y_uOneC0?si=dr47gBs9sw98QQTh).
