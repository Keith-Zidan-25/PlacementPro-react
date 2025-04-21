# Topic 4: Software Testing

### Learning Objectives:
* Identify bugs before deployment  
* Learn various types of testing techniques  

## Concept Overview:
**Software Testing** verifies and validates that the software does what it's supposed to do.

## Levels of Testing:
* **Unit Testing** – Tests individual functions or modules  
* **Integration Testing** – Tests combinations of units  
* **System Testing** – Tests the complete system  
* **Acceptance Testing** – Validated by end users  

## Manual vs Automated:
* **Manual**: Performed by humans (e.g., UI testing)  
* **Automated**: Performed by scripts/tools (e.g., Selenium)  

## Code Example (Python - Unit Test):
```python
import unittest

def add(x, y):
    return x + y

class TestMath(unittest.TestCase):
    def test_addition(self):
        self.assertEqual(add(2, 3), 5)

unittest.main()
```

Watch this video on [Software Testing](https://youtu.be/cDQ34z0oqnQ?si=ygcoUblAxySWdus7)

## Bug Lifecycle:
![Bug Lifecycle](/course-markdowns/SoftwareEngineering/images/bug_lifecycle.png)