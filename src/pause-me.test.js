const pauseMe = require("./pause-me");

describe("pauseMe-tests", () => {
  it("is a function", () => {
    expect(pauseMe).not.toBeUndefined();
    expect(pauseMe).not.toBeNull();
    expect(typeof pauseMe).toBe("function");
  });

  it("returns an object", () => {
    expect(typeof pauseMe(function(){}, 10)).toBe("object");
  });

  const timer = pauseMe(function () { return "done"; }, 500);
  describe("pauseMe has method start", () => {
    it("is a function", () => {
      expect(typeof timer.start).toBe("function");
      expect(timer.start()).toBeUndefined();
      timer.stop();
    });

    it("the timer starts immediately just like a setTimeout", done => {
      const newTimer = pauseMe(() => {
        expect(true).toBe(true);
        done();
      }, 50);

      expect(typeof newTimer.timer()).toBe("object");
    });

    it("starts a stopped timer", () => {
      const newTimer = pauseMe(() => {
        return "true";
      }, 50);

      newTimer.stop();
      expect(newTimer.timer()).toBeNull();
      newTimer.start();
      expect(typeof newTimer.timer()).toBe("object");
    });
  });

  describe("pauseMe has method pause", () => {
    it("is a function", () => {
      expect(typeof timer.pause).toBe("function");
      expect(timer.pause()).toBeUndefined();
    });

    it("pauses the timer", () => {
      timer.start();
      expect(typeof timer.timer()).toBe("object");
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
      expect(typeof timer.timer()).toBe("object");
      timer.pause();
      expect(timer.timer()).toBeNull();
      timer.resume();
      expect(typeof timer.timer()).toBe("object");
      timer.stop();
    });
  });

  describe("pauseMe has method stop", () => {
    it("is a function", () => {
      expect(typeof timer.stop).toBe("function");
      expect(timer.stop()).toBeUndefined();
    });

    it("stops a timer, causing the time to be reset", done => {
      const newTimer = pauseMe(() => {
        expect(Date.now() - 100).toBeGreaterThan(startTime);
        done();
      }, 100);
      const startTime = Date.now();
      
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
      expect(typeof timer.timer()).toBe("object");
    });

    it("returns null if the timer is paused", () => {
      timer.pause();
      expect(timer.timer()).toBeNull();
    });

    it("returns an object if the timer is resumed", () => {
      timer.resume();
      expect(typeof timer.timer()).toBe("object");
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

    it("restarts the timeout", done => {
      const newTimer = pauseMe(() => {
        expect(Date.now() - 100).toBeGreaterThan(startTime);
        done();
      }, 100);
      const startTime = Date.now();
      newTimer.restart();
    });
  });
});