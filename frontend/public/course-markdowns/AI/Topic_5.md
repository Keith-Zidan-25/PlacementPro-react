# Topic 5: Intelligent Agents


## Concept:
An intelligent agent is an entity that perceives its environment through sensors and acts upon it through actuators to achieve a goal.

### Structure:
```
Environment → Sensors → Agent Logic → Actuators → Environment
```
![Agents](/course-markdowns/AI/images/ai-diagram.png)

### Agent Example - Vacuum Cleaner:
|Sensor Input |Agent Decision|Actuator Action |
|-------------|:------------:|:--------------:|
|Detects Dirt |Clean         |Activate Vacuum |
|No Dirt      |Move          |Change Direction|

### Code:
```python
def vacuum_agent(room_state):
    if room_state == "dirty":
        return "Clean"
    else:
        return "Move to next"

print(vacuum_agent("dirty"))  # Output: Clean
```

### Types of Agents:
* **Simple Reflex Agent**: Responds to the current situation.
* **Model-Based Reflex Agent**: Maintains an internal state.
* **Goal-Based Agent**: Chooses actions that help reach a goal.
* **Utility-Based Agent**: Chooses actions that maximize happiness/utility.



## Activity:
> Design a Smart Traffic Light System:
>   Inputs: Time of day, traffic density, emergency vehicles.
>   Logic: If high density and emergency → green light.
>   Output: Adjusted signal timing.


You can watch this video on [Intelligent Agents](https://youtu.be/BkedAnQfJ_U?si=IOYCy0SLNphP5y3P).