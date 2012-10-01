## Generator
A simple project bootstrapping utility.

[![Build Status](https://secure.travis-ci.org/thisandagain/generator.png)](http://travis-ci.org/thisandagain/generator)

### Installation
```bash
[sudo] npm install -g generator
generate --setup
```

### Basic Use
```bash
generate -t module -n myAwesomeProject
```

### Creating A New Template
Templates are simply directories with any combination of files and sub-directories found within them. To create a new template simply create a new directory within your `~/.generator` path or copy one of the default templates and modify it. Upon use, Generator will walk the template looking for any instances of `__yourVariableName__` and prompt for a value. For example, a template including this:

```javascript
/**
 * __description__
 *
 * @package __name__
 * @author __author__ <__email__>
 */
```

Will prompt:
```bash
description: A description of my project
author: Nyan Cat
email: me@somedomain.com
```

Which will then write:
```javascript
/**
 * A description of my project
 *
 * @package myAwesomeProject
 * @author Nyan Cat <me@somedomain.com>
 */
```

---

### Default Templates
Generator comes with a number of templates to get you started (additional "starter" templates are welcomed). While they are usable as-is, the whole point of Generator is make the creation and modification of custom templates easy... so go get your hands dirty and hack your own!

- `module` Template for a standard [Node.js](http://nodejs.org/) module
- `binary` Template for a standard [Node.js](http://nodejs.org/) CLI application
- `arduino` Template for a basic [Arduino](http://www.arduino.cc/) project

---

### Testing
```bash
npm test
```