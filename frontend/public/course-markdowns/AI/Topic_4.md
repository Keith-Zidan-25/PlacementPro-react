# Topic 4: Search Algorithms in AI

### Goal:
Understand how AI agents explore problems and find solutions.


## Search Basics:
Problems are modeled as states with possible actions.
AI explores these using search trees or graphs.

### Types of Search:
* **Breadth-First Search (BFS)**:
    * Explores all neighbors before going deeper.
    * Uses a queue.

* **Depth-First Search (DFS)**:
    * Explores one path as far as possible before backtracking.
    * Uses a stack or recursion.

### Diagram:
```
       A
     /   \
    B     C
   / \     \
  D   E     F

BFS Order: A → B → C → D → E → F
DFS Order: A → B → D → E → C → F
```

## Python Code:
```python
from collections import deque

graph = {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['F'],
    'D': [], 'E': [], 'F': []
}

def bfs(start):
    visited = set()
    queue = deque([start])
    while queue:
        node = queue.popleft()
        if node not in visited:
            print(node, end=' ')
            visited.add(node)
            queue.extend(graph[node])

bfs('A')  # Output: A B C D E F
```


You can watch this video on [Search Algorithms in AI](https://youtu.be/gZpUcsB9TFc?si=Xkg0OznvYNN8qiC7).