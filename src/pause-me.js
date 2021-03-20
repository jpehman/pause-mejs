/*
 *@summary JavaScript setTimeout and setInterval utility that allows pausing, resuming, stopping, and starting a setTimeout
 *@license {@link https://github.com/jpehman/pause-mejs/blob/master/LICENSE}
 *@author Jonathan Ehman
 *@typedef object
 *@example
 * const pauseMe = require("pause-me");
 * 
 * const myTimeout = pauseMe(() => {
 *  console.log("timed out!");
 * }, 5000);
 * @param {function} callback - optional - function or lambda that you want executed after duration. If you do not include a callback, what's the point?
 * @param {number} duration - required - Milliseconds to set the timeout to. Throws an error if not a number or not included 
 * @param {bool} repeating - optional - When true the timeout is treated as an interval 
 */
const pauseMe = function (callback, duration, repeating) {
  let startTime = null, pauseTime = null,
      remainingTime = 0, originalCallback = function () {},
      timer = null;

  callback = callback || function () {};
  if (typeof duration !== "number") {
    throw new TypeError("duration must be a number", "function timeout", 10);
  }
  else if (duration < 0) {
    throw new Error("duration must be 0 or greater", "function timeout", 13);
  }

  remainingTime = duration;

  const start = function () {
    timer = setTimeout(callback, remainingTime);
    startTime = new Date();
  },

  clear = function () {
    clearTimeout(timer);
    timer = null;
  },

  pause = function () {
    if (timer === null) {
      // do not pause if paused or stopped
      return;
    }

    pauseTime = new Date();
    clear();
  },

  resume = function () {
    if (timer !== null || pauseTime === null) {
      // do not resume if not paused or stopped
      return;
    }

    remainingTime -= pauseTime.getTime() - startTime.getTime();
    pauseTime = null;
    if (remainingTime) {
      start();
    }
  },

  stop = function () {
    if (timer === null) {
      // do not stop if paused or stopped already
      return;
    }

    remainingTime = duration;
    pauseTime = null;
    clear();
  };

  if (repeating) {
    originalCallback = callback;

    // setting the callback to call the passed callback
    callback = function () {
      originalCallback();
      remainingTime = duration;
      clear();
      start();
    }
  }

  start();

  return {
    "start": function () {
      if (timer !== null) {
        // do not try to start if the timer is going already
        return;
      }

      // the remainingTime must be reset
      remainingTime = duration;
      start();
    },
    "pause": pause,
    "resume": resume,
    "stop": stop,
    "timer": function () {
      return timer;
    }
  };
}


if (typeof module !== 'undefined' && module.exports) {
  module.exports = pauseMe;
}