import pauseMe from "./pause-me";

describe("pauseMe-tests", () => {
  it("is a function", () => {
    expect(pauseMe).not.toBeUndefined();
    expect(pauseMe).not.toBeNull();
    expect(typeof pauseMe).toBe("function");
  });

  it("returns an object", () => {
    expect(typeof pauseMe(() => {}, 10)).toBe("object");
  });

  it("throws TypeError when duration is not a number", () => {
    expect(() => {
      // @ts-expect-error Testing invalid parameter type
      pauseMe(() => {}, "10");
    }).toThrow(TypeError);
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
