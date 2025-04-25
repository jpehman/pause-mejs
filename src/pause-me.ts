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

type Callback = () => void | null | undefined | any;

interface PauseMeTimer {
  /**
   * Starts a stopped timer
   */
  start(): void;
  
  /**
   * Pauses the timer
   */
  pause(): void;
  
  /**
   * Resumes a paused timer
   */
  resume(): void;
  
  /**
   * Restarts the timer from the beginning
   */
  restart(): void;
  
  /**
   * Stops the timer and resets it
   */
  stop(): void;
  
  /**
   * Returns the timer instance or null if not running
   * @returns The timer instance or null
   */
  timer(): NodeJS.Timeout | null;
}

export default function pauseMe(callback: Callback, duration: number, repeating: boolean = false): PauseMeTimer {
  let startTime: number | null = null, pauseTime: number | null = null,
      remainingTime: number = 0,
      timer: NodeJS.Timeout | null = null;

  callback = callback || function () {};
  if (typeof duration !== "number") {
    throw new TypeError("duration must be a number");
  }
  else if (duration < 0) {
    throw new Error("duration must be 0 or greater");
  }

  remainingTime = duration;

  const start = (): void => {
    timer = setTimeout(callback, remainingTime);
    startTime = Date.now();
  },

  clear = (): void => {
    if (timer === null) {
      return;
    }
    clearTimeout(timer);
    timer = null;
  },

  pause = (): void => {
    if (timer === null) {
      // do not pause if paused or stopped
      return;
    }

    pauseTime = Date.now();
    clear();
  },

  resume = (): void => {
    if (timer !== null || pauseTime === null || startTime === null) {
      // do not resume if not paused or stopped or startTime is null
      return;
    }

    remainingTime -= pauseTime - startTime;
    pauseTime = null;
    if (remainingTime) {
      start();
    }
  },

  stop = (): void => {
    remainingTime = duration;
    pauseTime = null;
    clear();
  };

  if (repeating) {
    let originalCallback = callback;

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
    start: (): void => {
      if (timer !== null) {
        // do not try to start if the timer is going already
        return;
      }

      // the remainingTime must be reset
      remainingTime = duration;
      start();
    },
    pause,
    resume,
    restart: (): void => {
      clear();
      remainingTime = duration;
      start();
    },
    stop,
    timer: (): NodeJS.Timeout | null => {
      return timer;
    }
  };
}
