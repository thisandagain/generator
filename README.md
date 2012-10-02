## Generator
**Generator is a CLI utility that is designed to make bootstrapping and templating projects simple.** Generator is platform agnostic: Like Node.js? Great. Ruby? Sounds good. Objective-C? Go for it.

[![Build Status](https://secure.travis-ci.org/thisandagain/generator.png)](http://travis-ci.org/thisandagain/generator)

### Installation
Generator can be installed using [NPM](https://npmjs.org/):
```bash
[sudo] npm install -g generator
```

Once installed, you should load the default templates:
```bash
generate --setup
```

### Usage
In order to bootstrap a project using one of the default templates you simply run `generate` and specifiy a template and project name. For example, let's create a new Node.js `module` called `myAwesomeProject`:
```bash
generate --type module --name myAwesomeProject
```

---

### How Templates Work
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

Which will generate:
```javascript
/**
 * A description of my project
 *
 * @package myAwesomeProject
 * @author Nyan Cat <me@somedomain.com>
 */
```

### Default Templates
Generator comes with a number of templates to get you started. While they are usable as-is, the whole point of Generator is make the creation of custom templates easy... so have fun and hack your own!

- `module` Template for a standard [Node.js](http://nodejs.org/) module
- `binary` Template for a standard [Node.js](http://nodejs.org/) CLI application
- `arduino` Template for a basic [Arduino](http://www.arduino.cc/) project

---

### Post Processing
By default, Generator will look for a `makefile` and (if found) will run `make generator` after all other template processing has been completed. This is particularly handy for dealing with template dependencies that may change over time (like git repositories or even [NPM](https://npmjs.org/) modules). For example:

```bash
generator:
    npm install

.PHONY: generator
```

---

### Testing
```bash
npm test
```