describe('First Functionality', () => {
  describe('Cool Feature', () => {
    it('passes', () => {
      expect(true).toBe(true);
    });

    it('makes sure that two objects are the same', () => {
      const foo = {hello: "Audience"};
      const bar = {hello: "Audience"};

      expect(foo).toEqual(bar);
    });

    it('makes sure that two objects are not the same', () => {
      const foo = {hello: "Audience"};
      const bar = {hello: "Everybody else"};

      expect(foo).not.toEqual(bar);
    });

    it('should throw an Error', () => {
      function throwsAnError(shouldThrow = false) {
        if (shouldThrow) {
          throw new Error('Some really bad error!');
        }
      }

      expect(() => throwsAnError(true)).toThrow();
      expect(() => throwsAnError(true)).toThrowError();
      expect(() => throwsAnError(true)).toThrowError('Some really bad error!');
    });

    it('should throw an EvilError', () => {
      class EvilError extends Error {}

      function throwsAnEvilError(shouldThrow = false) {
        if (shouldThrow) {
          throw new EvilError();
        }
      }

      let thrownError;
      try {
        throwsAnEvilError(true);
      } catch(error) {
        thrownError = error;
      }

      expect(thrownError).toEqual(jasmine.any(EvilError));
    });

    it('should be something trueish', () => {
      expect(42).toBeTruthy();
    });
  });

  describe('Timing Features', () => {
    beforeEach(() => {
      jasmine.clock().install();
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });

    function sleepAndDoSomething(callback) {
      setTimeout(
        () => callback('Hey I am awake now!'),
        2500
      );
    }

    it('should execute the callback', (done) => {
      const callback = (message) => {
        expect(message).toEqual('Hey I am awake now!');
        done();
      };

      sleepAndDoSomething(callback);
      jasmine.clock().tick(2600);
    });

    it('should execute the callback using spies', () => {
      const callback = jasmine.createSpy('sleep callback');

      sleepAndDoSomething(callback);
      jasmine.clock().tick(2600);

      expect(callback).toHaveBeenCalled();
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith('Hey I am awake now!');
    });
  });
});

