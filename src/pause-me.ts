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

export type TPauseMeCallback = () => void | null | undefined | any;

export interface IPauseMeTimer {
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

abstract class PauseMe implements IPauseMeTimer {
  private _callback: TPauseMeCallback;
  private _duration: number = 0;
  private _remainingTime: number = 0;
  private _timeout: NodeJS.Timeout | null = null;
  private _startTime: number | null = null;
  private _pauseTime: number | null = null;
  constructor(callback: TPauseMeCallback, duration: number) {
    this.callback = callback;
    this.duration = duration;
    this.remainingTime = duration;
  }

  set callback(callback: TPauseMeCallback) {
    if (typeof callback !== "function") {
      throw new Error("callback must be a function");
    }
    this._callback = callback;
  }

  get callback(): TPauseMeCallback {
    return this._callback;
  }

  set duration(duration: number) {
    if (typeof duration !== "number" || duration <= 0) {
      throw new Error("duration must be a number greater than 0");
    }
    this._duration = duration;
  }

  get duration(): number {
    return this._duration;
  }

  set remainingTime(remainingTime: number) {
    if (typeof remainingTime !== "number") {
      throw new Error("remainingTime must be a number");
    }

    this._remainingTime = remainingTime;
  }

  get remainingTime(): number {
    return this._remainingTime;
  }

  set timeout(timeout: NodeJS.Timeout | null) {
    this._timeout = timeout;
  }

  get timeout(): NodeJS.Timeout | null {
    return this._timeout;
  }

  set startTime(startTime: number | null) {
    if (startTime !== null && typeof startTime !== "number") {
      throw new Error("startTime must be a number or null");
    }
    this._startTime = startTime;
  }

  get startTime(): number | null {
    return this._startTime;
  }

  set pauseTime(pauseTime: number | null) {
    if (pauseTime !== null && typeof pauseTime !== "number") {
      throw new Error("pauseTime must be a number or null");
    }
    this._pauseTime = pauseTime;
  }

  get pauseTime(): number | null {
    return this._pauseTime;
  }

  abstract initialize(): void;
  abstract clear(): void;

  start = (): void => {
    if (this.timeout !== null) {
      // do not try to start if the timer is going already
      return;
    }

    this.remainingTime = this.duration;
    this.initialize();
  };

  pause = (): void => {
    if (this.timeout === null) {
      // do not pause if paused or stopped
      return;
    }

    this.pauseTime = Date.now();
    this.clear();
  };

  stop = (): void => {
    this.remainingTime = this.duration;
    this.pauseTime = null;
    this.clear();
  };

  resume = (): void => {
    if (this.timeout !== null || this.pauseTime === null || this.startTime === null) {
      return;
    }

    this.remainingTime -= (this.pauseTime - this.startTime);
    this.pauseTime = null;
    this.remainingTime > 0 && this.initialize();
  };

  restart = (): void => {
    this.clear();
    this.remainingTime = this.duration;
    this.initialize();
  };

  timer = (): NodeJS.Timeout | null => {
    return this.timeout;
  };
}

class PauseMeTimer extends PauseMe {
  constructor(callback: TPauseMeCallback, duration: number) {
    super(callback, duration);

    this.initialize();
  }

  initialize = () => {
    this.timeout = setTimeout(this.callback, this.remainingTime);
    this.startTime = Date.now();
  };

  clear = (): void => {
    if (this.timeout === null) {
      return;
    }
    clearTimeout(this.timeout);
    this.timeout = null;
  };
}

class PauseMeInterval extends PauseMe {
  constructor(callback: TPauseMeCallback, duration: number) {
    super(callback, duration);

    this.initialize();
  }

  initialize = (): void => {
    this.timeout = setInterval(this.callback, this.remainingTime);
    this.startTime = Date.now();
  };

  clear = (): void => {
    if (this.timeout === null) {
      return;
    }
    clearInterval(this.timeout);
    this.timeout = null;
  };

  resume = (): void => {
    if (this.timeout !== null || this.pauseTime === null || this.startTime === null) {
      return;
    }

    this.remainingTime -= (this.pauseTime - this.startTime);
    this.pauseTime = null;
    if (this.remainingTime <= 0) {
      this.remainingTime = this.duration;
    }
    this.remainingTime > 0 && this.initialize();
  };
}

export function getTimeout(callback: TPauseMeCallback, duration: number): IPauseMeTimer {
  return new PauseMeTimer(callback, duration);
}

export function getInterval(callback: TPauseMeCallback, duration: number): IPauseMeTimer { 
  return new PauseMeInterval(callback, duration);
}

export default function pauseMe(callback: TPauseMeCallback, duration: number, repeating: boolean = false): IPauseMeTimer {
  if (repeating) {
    return getInterval(callback, duration);
  } 
    
  return getTimeout(callback, duration);
}
