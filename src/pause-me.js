function pauseMe (callback, duration, repeating) {
  "use strict";

  var startTime = null, pauseTime = null,
      remainingTime = 0, originalCallback = callback,
      timer = null;

  callback = callback || function () {};
  if (typeof duration !== "number") {
    throw new TypeError("duration must be a number", "function timeout", 10);
  }
  else if (duration < 0) {
    throw new Error("duration must be 0 or greater", "fuction timeout", 13);
  }

  remainingTime = duration;

  var start = function () {
    timer = setTimeout(callback, remainingTime);
    startTime = new Date();
  },

  clear = function () {
    clearTimeout(timer);
    timer = null;
  },

  pause = function () {
    if (timer === null) {
      return;
    }

    pauseTime = new Date();
    clear();
  },

  resume = function () {
    if (timer !== null || pauseTime === null) {
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
      return;
    }

    remainingTime = duration;
    pauseTime = null;
    clear();
  };

  if (repeating) {
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
        return;
      }

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

module.exports = pauseMe; 
