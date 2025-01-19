# Military Commenting (MilComs) 

## Features
VS Code Extension for comments. 

This project will provide a more enjoyable commenting style. This extension enables a commenting style that mirrors some aspects of miltiary weapons system operating manuals. This extension will connect the following words [DANGER, WARNING, CAUTION] with the following emojies: [ ❗, ⚠️, 🚨 ]. THese emojis will be used in a later version: [✅, ⛔, ⚠ ].

DANGER ❗: Indicates an imminent hazard that could cause harm to your model (e.g.: regression vs. classificaion; continuous vs. discrete data).

WARNING ⚠️: Indicates a potential hazard that could cause harm to your model if approved procedures are not followed (e.g.: epxloding grdient).

CAUTION 🚨: Indicates a hazard that culd severly damage equipment, systems, or vehciles and consquently threated the mission if approved procedures are not followed (e.g.: engineer data; install CUDA or CUDA Toolkit)

```python
# ❗DANGER : 
"""❗DANGER : """

# ⚠️ WARNING :
"""⚠️ WARNING :"""

# 🚨 CAUTION :
"""🚨 CAUTION :"""
```

### Development: testing and debugging
Currently [ 20250119 ] the extension only works on raw lines of code with raw text that will be replaced with the above statements. 

\!\[feature X\]\(images/feature-x.png\)

> Tip: Many popular extensions utilize animations. This is an excellent way to show off your extension! We recommend short, focused animations that are easy to follow.

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: Enable/disable this extension.
* `myExtension.thing`: Set to `blah` to do something.

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
* Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
