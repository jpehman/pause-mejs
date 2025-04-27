import pauseMe, { getTimeout, getInterval } from "./pause-me";

describe("pauseMe-tests", () => {
  it("is a function", () => {
    expect(pauseMe).not.toBeUndefined();
    expect(pauseMe).not.toBeNull();
    expect(typeof pauseMe).toBe("function");
  });

  it("returns an object", () => {
    expect(typeof pauseMe(() => {}, 10)).toBe("object");
  });

  it("throws Error when duration is not a number", () => {
    expect(() => {
      // @ts-expect-error Testing invalid parameter type
      pauseMe(() => {}, "10");
    }).toThrow(Error);
  });

  it("throws Error when duration is negative", () => {
    expect(() => {
      pauseMe(() => {}, -10);
    }).toThrow(Error);
  });

  const timer = pauseMe(function (): string { return "done"; }, 500);
  
  describe("pauseMe has method start", () => {
    it("is a function", () => {
      expect(typeof timer.start).toBe("function");
      expect(timer.start()).toBeUndefined();
      timer.stop();
    });

    it("the timer starts immediately just like a setTimeout", (done) => {
      const newTimer = pauseMe(() => {
        expect(true).toBe(true);
        done();
      }, 10);

      expect(typeof newTimer.timer()).toBe("number");
    });

    it("starts a stopped timer", () => {
      const newTimer = pauseMe((): string => {
        return "true";
      }, 10);

      newTimer.stop();
      expect(newTimer.timer()).toBeNull();
      newTimer.start();
      expect(typeof newTimer.timer()).toBe("number");
      newTimer.stop();
    });
  });

  describe("pauseMe has method pause", () => {
    it("is a function", () => {
      expect(typeof timer.pause).toBe("function");
      expect(timer.pause()).toBeUndefined();
    });

    it("pauses the timer", () => {
      timer.start();
      expect(typeof timer.timer()).toBe("number");
      timer.pause();
      expect(timer.timer()).toBeNull();
      timer.resume();
      timer.stop();
    });
  });

  describe("pauseMe has method resume", () => {
    it("is a function", () => {
      expect(typeof timer.resume).toBe("function");
      expect(timer.resume()).toBeUndefined();
    });

    it("resumes a paused or stopped timer", () => {
      timer.start();
      expect(typeof timer.timer()).toBe("number");
      timer.pause();
      expect(timer.timer()).toBeNull();
      timer.resume();
      expect(typeof timer.timer()).toBe("number");
      timer.stop();
    });
  });

  describe("pauseMe has method stop", () => {
    it("is a function", () => {
      expect(typeof timer.stop).toBe("function");
      expect(timer.stop()).toBeUndefined();
    });

    it("stops a timer, causing the time to be reset", (done) => {
      const startTime = Date.now();
      const newTimer = pauseMe(() => {
        expect(Date.now() - 100).toBeGreaterThan(startTime);
        done();
      }, 105);
      
      newTimer.stop();
      newTimer.start();
    });
  });

  describe("pauseMe has method timer", () => {
    it("is a function", () => {
      expect(typeof timer.timer).toBe("function");
      expect(timer.timer()).toBeNull();
    });

    it("returns an object if the timer is going", () => {
      timer.start();
      expect(typeof timer.timer()).toBe("number");
    });

    it("returns null if the timer is paused", () => {
      timer.pause();
      expect(timer.timer()).toBeNull();
    });

    it("returns an object if the timer is resumed", () => {
      timer.resume();
      expect(typeof timer.timer()).toBe("number");
    });

    it("returns null if the timer is stopped", () => {
      timer.stop();
      expect(timer.timer()).toBeNull();
    });
  });

  describe("pauseMe has method restart", () => {
    it("is a function", () => {
      expect(typeof timer.restart).toBe("function");
      expect(timer.restart()).toBeUndefined();
    });

    it("restarts the timeout", (done) => {
      const startTime = Date.now();
      const newTimer = pauseMe(() => {
        expect(Date.now() - 100).toBeGreaterThan(startTime);
        done();
      }, 105);
      newTimer.restart();
    });
  });

  describe("pauseMe with repeating option", () => {
    it("behaves like setInterval when repeating is true", (done) => {
      let count = 0;
      const startTime = Date.now();
      const interval = 50;
      
      const newTimer = pauseMe(() => {
        count++;
        if (count === 3) {
          newTimer.stop();
          expect(count).toBe(3);
          done();
        }
      }, interval, true);
    });
  });
});

describe("getTimeout function", () => {
  it("is a function", () => {
    expect(getTimeout).not.toBeUndefined();
    expect(getTimeout).not.toBeNull();
    expect(typeof getTimeout).toBe("function");
  });

  it("returns an object implementing IPauseMeTimer", () => {
    const timer = getTimeout(() => {}, 10);
    expect(typeof timer).toBe("object");
    expect(typeof timer.start).toBe("function");
    expect(typeof timer.pause).toBe("function");
    expect(typeof timer.resume).toBe("function");
    expect(typeof timer.restart).toBe("function");
    expect(typeof timer.stop).toBe("function");
    expect(typeof timer.timer).toBe("function");
    timer.stop();
  });

  it("throws Error when duration is not a number", () => {
    expect(() => {
      // @ts-expect-error Testing invalid parameter type
      getTimeout(() => {}, "10");
    }).toThrow(Error);
  });

  it("throws Error when duration is negative", () => {
    expect(() => {
      getTimeout(() => {}, -10);
    }).toThrow(Error);
  });

  it("executes callback after specified duration", (done) => {
    const startTime = Date.now();
    const duration = 50;
    
    getTimeout(() => {
      const elapsedTime = Date.now() - startTime;
      expect(elapsedTime).toBeGreaterThanOrEqual(duration);
      done();
    }, duration+5);
  });

  it("can be paused and resumed", (done) => {
    const startTime = Date.now();
    const duration = 100;
    let pausedTime: number;
    
    const timer = getTimeout(() => {
      const totalTime = Date.now() - startTime;
      // Total time should be at least duration + pause duration
      expect(totalTime).toBeGreaterThanOrEqual(duration + 50);
      done();
    }, duration);
    
    // Pause after 20ms
    setTimeout(() => {
      timer.pause();
      pausedTime = Date.now();
      
      // Resume after 50ms pause
      setTimeout(() => {
        timer.resume();
        const resumeTime = Date.now();
        expect(resumeTime - pausedTime).toBeGreaterThanOrEqual(50);
      }, 50);
    }, 20);
  });
});

// Tests for getInterval
describe("getInterval function", () => {
  it("is a function", () => {
    expect(getInterval).not.toBeUndefined();
    expect(getInterval).not.toBeNull();
    expect(typeof getInterval).toBe("function");
  });

  it("returns an object implementing IPauseMeTimer", () => {
    const timer = getInterval(() => {}, 10);
    expect(typeof timer).toBe("object");
    expect(typeof timer.start).toBe("function");
    expect(typeof timer.pause).toBe("function");
    expect(typeof timer.resume).toBe("function");
    expect(typeof timer.restart).toBe("function");
    expect(typeof timer.stop).toBe("function");
    expect(typeof timer.timer).toBe("function");
    timer.stop();
  });

  it("executes callback repeatedly at specified interval", (done) => {
    let count = 0;
    const interval = 50;
    
    const timer = getInterval(() => {
      count++;
      if (count === 3) {
        timer.stop();
        expect(count).toBe(3);
        done();
      }
    }, interval);
  });

  it("can be paused and resumed", (done) => {
    let count = 0;
    let pauseTime: number;
    let resumeTime: number;
    
    const timer = getInterval(() => {
      count++;
      if (count === 2) {
        // Pause after second execution
        expect(typeof timer.timer()).toBe("number");
        timer.pause();
        pauseTime = Date.now();
        
        // Resume after 100ms
        setTimeout(() => {
          timer.resume();
          resumeTime = Date.now();
        }, 100);
      }
      
      if (count === 4) {
        timer.stop();
        // Verify there was a significant pause
        expect(resumeTime - pauseTime).toBeGreaterThanOrEqual(100);
        done();
      }
    }, 50);
  });

  it("can be stopped and restarted", (done) => {
    let firstRunCount = 0;
    let secondRunCount = 0;
    const interval = 30;
    
    const timer = getInterval(() => {
      firstRunCount++;
      
      if (firstRunCount === 2) {
        timer.stop();
        expect(timer.timer()).toBeNull();
        
        // Start a second run after stopping
        setTimeout(() => {
          timer.start();
          
          // Now we're counting the second run
          const secondTimer = setInterval(() => {
            secondRunCount++;
            
            if (secondRunCount === 2) {
              clearInterval(secondTimer);
              timer.stop();
              expect(firstRunCount).toBe(4);
              expect(secondRunCount).toBe(2);
              done();
            }
          }, 30);
        }, 50);
      }
    }, interval);
  });
});

// Test for comparing behavior between original pauseMe and new functions
describe("compatibility between pauseMe and new functions", () => {
  it("getTimeout behaves the same as pauseMe with repeating=false", (done) => {
    let pauseMeCalled = false;
    let getTimeoutCalled = false;
    
    const checkBothCalled = () => {
      if (pauseMeCalled && getTimeoutCalled) {
        done();
      }
    };
    
    pauseMe(() => {
      pauseMeCalled = true;
      checkBothCalled();
    }, 30, false);
    
    getTimeout(() => {
      getTimeoutCalled = true;
      checkBothCalled();
    }, 30);
  });
  
  it("getInterval behaves the same as pauseMe with repeating=true", (done) => {
    let pauseMeCount = 0;
    let getIntervalCount = 0;
    
    const pauseMeTimer = pauseMe(() => {
      pauseMeCount++;
      if (pauseMeCount === 3) {
        pauseMeTimer.stop();
      }
    }, 30, true);
    
    const intervalTimer = getInterval(() => {
      getIntervalCount++;
      if (getIntervalCount === 3) {
        intervalTimer.stop();
        
        // Both should have executed the same number of times
        expect(pauseMeCount).toBe(3);
        expect(getIntervalCount).toBe(3);
        done();
      }
    }, 30);
  });
});
