# Topic 3: TCP/IP Model

### Learning Objectives:
* Understand how the TCP/IP model simplifies network communication  
* Compare with OSI model in real-world usage  

## Concept Overview:
The **TCP/IP (Transmission Control Protocol/Internet Protocol)** model is a practical and concise 4-layer model used in today's internet communication.  
It simplifies data transmission by grouping functions.

## Layers of TCP/IP:

| Layer | OSI Equivalent | Key Responsibilities |
|-------|----------------|----------------------|
| Application | Layers 5-7 | Email, web browsing |
| Transport | Layer 4 | Ensures complete data transfer |
| Internet | Layer 3 | Routing, addressing |
| Network Access | Layers 1-2 | Physical media, transmission |

![TCP MODEL](/course-markdowns/CN/images/tcp_ip_model.png)

## TCP vs UDP:
| Feature | TCP | UDP |
|---------|-----|-----|
| Connection | Connection-oriented | Connectionless |
| Reliability | Ensures delivery | No guarantee |
| Speed | Slower | Faster |
| Use Case | Email, browsing | Gaming, live streaming |

## Code Demo (Socket Programming):
```python
# TCP Client Example
import socket

client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client.connect(('127.0.0.1', 8080))
client.send(b'Hello Server')
response = client.recv(4096)
print(response)
client.close()
```

You can watch this video on [TCP/IP Model](https://youtu.be/2QGgEk20RXM?si=OOaj93bEp925uA1v).
