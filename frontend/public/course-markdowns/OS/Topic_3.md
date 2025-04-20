# Topic 3: Memory Management


### Learning Objectives:
* Understand how memory is managed in computers
* Learn about paging, segmentation, and virtual memory


## Concept Overview:
Memory Management is crucial for program execution. The OS keeps track of each byte in a computer’s memory and manages allocation and deallocation.

### Paging:
* Logical memory is divided into pages
* Physical memory is divided into frames
* A page table maps logical pages to physical frames

#### Example:
![Paging](/course-markdown/OS/images/paging.png)
> This allows non-contiguous memory allocation and reduces fragmentation.

### Segmentation:
* Divides memory into logical units like code, data, and stack segments.
* Each segment has its own length and base address


## Virtual Memory:
* Uses secondary storage (disk) as an extension of main memory (RAM)
* Enables running large programs even with limited RAM

### Example:
```
int main() {
    int *a = malloc(1000000 * sizeof(int));
    // Dynamically allocated memory managed by OS
}
```

### Diagram - Virtual Memory:
![Virtual Address Space](/course-markdowns/OS/images/virtual_memory.png)

You can watch this video on [Memory Management](https://youtu.be/eESIFJz7mJw?si=UPaNLUwOV-yjcuT1).