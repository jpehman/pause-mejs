# pause-me, A Dependency Free setTimeout Utility
[ [pause-me on npm](https://www.npmjs.com/package/pause-me "npm") ]

The "pause-me" utility allows pausing, resuming, stopping and starting a `setTimeout`.

# Install #

	$ npm install pause-me --save

# Node #


    const pauseMe = require("pause-me");


Use it like you would a setTimeout

	const myTimeout = pauseMe(function () {
		console.log("timed out!");
	}, 5000);


or 

	const myTimeoutFunc = function () {
		console.log("timed out!");
	};

	const myTimeout = pauseMe(myTimeoutFunc, 5000);

## pause ##

Then you can pause the timeout anywhere `myTimeout` is in scope.

	myTimeout.pause();

## resume ##

When you are ready, you can then resume the timeout anywhere `myTimeout` is in scope.

	myTimeout.resume();

## stop ##

If you want to clear the time out, just call `stop()`

	myTimeout.stop();

This does not remove `myTimeout` from the scope.

## start ##
So you can still start the timeout from the beginning again if you want to.

	myTimeout.start();

# License #

Published under the [MIT license](https://github.com/jpehman/pause-mejs/blob/master/LICENSE "MIT License").