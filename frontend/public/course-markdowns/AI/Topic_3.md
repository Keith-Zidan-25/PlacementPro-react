# Topic 3: Rule-Based & Expert Systems


### Learning Focus:
Discover how early AI used fixed rules to make decisions.


## Rule-Based Systems:
* Operate with predefined IF-THEN logic.
* Do not adapt or learn; purely deterministic.

### Real-Life Example:
```
Thermostat:
    IF room_temp < 22 THEN turn_on_heater
```

### Components of an Expert System:
* **Knowledge Base**: Contains rules and facts.
* **Inference Engine**: Applies logical rules to deduce new facts.
* **User Interface**: For input/output with the user.


## Code Example:
```python
def diagnose(symptoms):
    if "fever" in symptoms and "cough" in symptoms:
        return "Possible: Flu"
    elif "headache" in symptoms:
        return "Possible: Migraine"
    else:
        return "Further diagnosis needed"

print(diagnose(["fever", "cough"]))  # Output: Possible: Flu
```


You can watch this video on [Rule-Based & Expert System](https://youtu.be/o0GFC6c_k4g?si=MY4Q78sfg29mpg0r).