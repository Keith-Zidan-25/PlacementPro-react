# Topic 2: AI vs. ML vs. Deep Learning

### Objective:
Understand how AI, ML, and DL relate and differ.


## Hierarchical Relationship:
```
Artificial Intelligence
    └── Machine Learning
            └── Deep Learning
```

## Definitions:
* **Artificial Intelligence (AI)**: The broad concept of machines simulating human intelligence.
* **Machine Learning (ML)**: A subset of AI focused on machines learning from data without being explicitly programmed.
* **Deep Learning (DL)**: A subset of ML that uses artificial neural networks with multiple layers for pattern recognition.


### Real-World Examples:
|Task                    |AI |ML |DL |
|------------------------|:-:|:-:|:-:|
|Face detection in images|✅ |✅|✅|
|Email spam filtering    |✅ |✅|   |
|Self-driving cars       |✅ |✅|✅|


## Rule-Based AI Example:
```python
def classify_weather(temp):
    if temp < 20:
        return "Cold"
    elif temp < 35:
        return "Moderate"
    else:
        return "Hot"

print(classify_weather(28))  # Output: Moderate
```

## ML-based Example:
```python
from sklearn.linear_model import LinearRegression
import numpy as np

# Training data
X = np.array([[1], [2], [3], [4]])  # Hours studied
y = np.array([50, 60, 70, 80])      # Scores

model = LinearRegression()
model.fit(X, y)

# Predict for 5 hours
print(model.predict([[5]]))  # Output: ~90
```

You can watch this video on [AI vs. ML vs. Deep Learning](https://youtu.be/WSbgixdC9g8?si=QWVc6fukatlxXEgT).