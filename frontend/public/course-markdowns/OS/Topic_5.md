# Topic 5: Synchronization and Deadlocks


### Learning Objectives:
* Understand synchronization in multiprocessing
* Learn how deadlocks occur and how to avoid them


## Concept Overview:
When multiple processes access shared data or resources, synchronization is required to maintain consistency.

### Race Conditions:
Two processes reading and writing to the same variable simultaneously may lead to unexpected behavior.

### Synchronization Techniques:
* **Mutex (Mutual Exclusion)**: Locks a resource
* **Semaphore**: Signaling mechanism (binary & counting)
* **Monitors**: High-level abstraction


## Deadlock:
Occurs when two or more processes are waiting indefinitely for resources held by each other.

### Four Conditions for Deadlock:
* Mutual Exclusion
* Hold and Wait
* No Preemption
* Circular Wait


### Deadlock Cycle:
[Deadlock Lifecyle](/course-markdowns/OS/images/deadlock_lifecycle.png)


### Semaphore Code Example:
```c
#include <semaphore.h>
#include <pthread.h>

sem_t mutex;
sem_init(&mutex, 0, 1);

void *critical_section(void *arg) {
    sem_wait(&mutex);
    // Critical section
    printf("Thread %d in critical section\n", *(int *)arg);
    sem_post(&mutex);
    return NULL;
}
```

https://youtu.be/rWFH6PLOIEI?si=s361fDbJ8wMJpjHd