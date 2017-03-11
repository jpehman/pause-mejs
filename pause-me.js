"use strict";

function pauseme (callback, duration) {
  var startTime = null, pauseTime = null,
      remainingTime = 0,
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
    if (timer !== null) {
      return;
    }

    remainingTime -= pauseTime.getTime() - startTime.getTime();
    if (remainingTime) {
      start();
    }
  },

  stop = function () {
    if (timer === null) {
      return;
    }

    remainingTime = duration;
    clear();
  };

  start();

  return {
    "start": start,
    "pause": pause,
    "resume": resume,
    "stop": stop
  }
}

module.exports = pauseme; 
