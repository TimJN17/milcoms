
<p align="center">
<img src="assets\20250212-Tank-120x120.jpg">
</p>

# Military Commenting (MilComs) 

## Features
VS Code Extension for comments. 

This project will provide a more enjoyable commenting style. This extension enables a commenting style that mirrors some aspects of miltiary weapons system operating manuals. This extension will connect the following words [DANGER, CAUTION, ALERT, SUCCESS] with the following emojies: [ ❗, ⚠️, 🚨, ✅]. More will be added in the future.

DANGER ❗: Indicates an imminent hazard that could cause harm to your model (e.g.: regression vs. classificaion; continuous vs. discrete data).

CAUTION ⚠️: Indicates a potential hazard that could cause harm to your model if approved procedures are not followed (e.g.: epxloding grdient).

ALERT 🚨: Indicates a critical component of the software, e.g. recursion, datatypes, data stream rates, etc. 

```python
# ❗DANGER : 
"""❗DANGER : """

# ⚠️ CAUTION :
"""⚠️ CAUTION :"""

# 🚨 ALERT :
"""🚨 ALERT :"""
```

### Development: testing and debugging
Currently the extension only works on raw lines of code with raw text that will be replaced with the above statements. 

> Tip: Many popular extensions utilize animations.

## Known Issues
Extension does not work within currently commented lines. Only raw text serves as amedium for the recommendations. 

### 1.0.0
Initial release of "Military Commenting" for improved commenting experience. 

**Enjoy!**
