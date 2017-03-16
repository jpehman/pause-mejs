# pause-me, A Dependency Free setTimeout Utility
[ [pause-me on npm](https://www.npmjs.com/package/pause-me "npm") ]

The "pause-me" utility allows pausing, resuming, stopping and starting a `setTimeout`.

# Install #

	  $ npm install pause-me --save

# Node #


      const pauseMe = require("pause-me");

Use it like you would a `setTimeout`

	  const myTimeout = pauseMe(function () {  
		console.log("timed out!");
	  }, 5000);


or 

	  const myTimeoutFunc = function () {
		console.log("timed out!");
	  };

	  const myTimeout = pauseMe(myTimeoutFunc, 5000);  

### Added in 1.1.0 ###

You can also use it as a `setInterval` by setting the `repeating` parameter to ` true`.

	   let counter = 0;
	   const myInterval = pauseMe(function () {  
		counter++;
		console.log("Interval " + counter);
	  }, 5000, true);

When the `setTimeout` is finished it immediately restarts in order to behave like an `setInterval`.

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

## timer ##
Also added in 1.1.0, you can test the `setTimeout` instance to see whether or not is still running.

	  if (myTimeout.timer() === null) {  
	    //myTimeout is not running
	  }
	  else {
	    //myTimeout is running
	  }

# License #

Published under the [MIT license](https://github.com/jpehman/pause-mejs/blob/master/LICENSE "MIT License").