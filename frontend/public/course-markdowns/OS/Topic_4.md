# Topic 4: File Systems

## Learning Objectives:
* Learn how files are organized and accessed
* Understand directory structure and file allocation


## Concept Overview:
A file system defines how data is stored, organized, and retrieved from storage devices. It includes file naming, directories, and metadata.

### Basic File Operations:
* **Create**: Make new files
* **Read/Write**: Access and modify content
* **Delete**: Remove files


### Directory Structures:
* **Single-level**: All files in one directory
* **Two-level**: Separate user directories
* **Hierarchical**: Tree-like nested folders (most common)


### Allocation Techniques:
* **Contiguous**: Files occupy consecutive blocks (fast but inflexible)
* **Linked**: Blocks contain pointers to next block (flexible, but slow)
* **Indexed**: Uses index block with all file block addresses (efficient)


### Bash Commands:
```
# Create a file
touch demo.txt

# Write to a file
echo "Hello OS" > demo.txt

# View contents
cat demo.txt
```

### Directory Tree:
```
/
├── bin
├── home
│   └── student
│       └── notes.txt
└── etc
```

You can watch this video on [File Systems](https://youtu.be/0LtuQhNFFe0?si=P05lVW1S4Q71NE3B).