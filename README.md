[![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fjpehman%2Fpause-mejs%2Fmaster%2Fpackage.json&query=%24.version&prefix=v&label=npm&color=blue)](https://www.npmjs.com/package/pause-me) [![Static Badge](https://img.shields.io/badge/node-v16%2B-blue?style=flat&label=node&color=blue)](https://nodejs.org) [![install size](https://packagephobia.com/badge?p=pause-me)](https://packagephobia.com/result?p=pause-me) [![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fjpehman%2Fpause-mejs%2Fmaster%2Fpackage.json&query=%24.license&label=license&color=green)](https://github.com/jpehman/pause-mejs/blob/main/LICENSE) [![Node.js CI](https://github.com/jpehman/pause-mejs/actions/workflows/node.js.yml/badge.svg)](https://github.com/jpehman/pause-mejs/actions/workflows/node.js.yml)
 
# pause-me, A Dependency Free setTimeout Utility
[ [pause-me on npm](https://www.npmjs.com/package/pause-me "npm") ]

The "pause-me" utility allows pausing, resuming, stopping and starting a `setTimeout`.

# Install #

```bash
$ npm install pause-me --save  
```

```yarn
$ yarn add pause-me
```

# Usage #

## ESM Import (Recommended) ##

```javascript
import pauseMe from "pause-me";
```

## CommonJS Require ##

```javascript
const pauseMe = require("pause-me");
```

## Basic Usage ##

Use it like you would a `setTimeout`

```javascript
const myTimeout = pauseMe(() => {  
  console.log("timed out!");
}, 5000);
```

or 

```javascript
const myTimeoutFunc = () => {
  console.log("timed out!");
};

const myTimeout = pauseMe(myTimeoutFunc, 5000);  
```

### TypeScript Support ###

As of version 2.0.0, pause-me is written in TypeScript and includes type definitions out of the box:

```typescript
import pauseMe from "pause-me";

// The returned object is fully typed
const myTimeout = pauseMe(() => {
  console.log("timed out!");
}, 5000);

// TypeScript will provide autocomplete and type checking
myTimeout.pause();
```

### Interval Mode ###

You can also use it as a `setInterval` by setting the `repeating` parameter to `true`.

```javascript
let counter = 0;
const myInterval = pauseMe(() => {  
  counter++;
  console.log("Interval " + counter);
}, 5000, true);
```

When the `setTimeout` is finished it immediately restarts in order to behave like a `setInterval`.

## API ##

### pause ###

Pause the timeout anywhere `myTimeout` is in scope.

```javascript
myTimeout.pause();  
```

### resume ###

Resume the timeout anywhere `myTimeout` is in scope.

```javascript
myTimeout.resume();  
```

### stop ###

Clear the timeout.

```javascript
myTimeout.stop();  
```

This does not remove `myTimeout` from the scope.

### start ###
Start the timeout from the beginning again.

```javascript
myTimeout.start();  
```

### restart ###
Restart the timeout at any point.

```javascript
myTimeout.restart();
```

### timer ###
Test the `setTimeout` instance to see whether or not it is still running.

```javascript
if (myTimeout.timer() === null) {  
  // myTimeout is not running
} else {
  // myTimeout is running
}
```

# Breaking Changes #

## Version 2.0.0 ##

- Converted to TypeScript with full type definitions
- Changed to ESM format by default (CommonJS still supported)
- Updated module exports to support both ESM and CommonJS
- Improved error handling and type checking
- Arrow functions used for better `this` binding
- Stricter type checking for parameters

## Version 1.3.0 ##

Previously, `stop` would not do anything if the timeout was paused. This behavior is not intuitive, so now `stop` will clear the timeout and reset the timer even if the timeout is paused.

# License #

Published under the [MIT license](https://github.com/jpehman/pause-mejs/blob/master/LICENSE "MIT License").
