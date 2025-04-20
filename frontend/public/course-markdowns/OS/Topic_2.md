# Topic 2: Process Management


### Learning Objectives:
* Understand what a process is and how it differs from a program
* Learn process life cycle and states
* Understand context switching, multitasking, and scheduling


## Concept Overview:
A **process** is an instance of a program in execution. It is an active entity with a **Program Counter (PC)**, **registers**, **stack**, and a dedicated memory space.

### Process Life Cycle:
A process can be in one of the following states:
* **New**: Being created
* **Ready**: Waiting to be assigned to a processor
* **Running**: Currently being executed
* **Waiting/Blocked**: Waiting for some event (e.g., I/O completion)
* **Terminated**: Finished execution

![Process Lifecyle](/course-markdown/OS/images/process_lifecycle.png)


## Context Switching:
When the CPU switches from one process to another, the OS saves the current state (context) of the old process and loads the saved state of the new process.

### Multitasking:
The OS enables multiple programs to run seemingly at the same time by switching quickly between them.


### Scheduling Algorithms:
* **FCFS (First-Come, First-Served)**
* **SJF (Shortest Job First)**
* **Round Robin**
* **Priority Scheduling**

![Types of Process](/course-markdowns/OS/images/process_diagram.png)

## Code Simulation (fork example):
```
#include <stdio.h>
#include <unistd.h>

int main() {
    fork();  // Creates a child process
    printf("Process ID: %d\n", getpid());
    return 0;
}
```
> This code will print process IDs for both the parent and child.

You can watch a Video on [Process Management](https://youtu.be/aytWaG4mEJI?si=IJVuSxRj9bvdrtmD).