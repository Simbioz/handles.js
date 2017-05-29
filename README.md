# handles.js

A simple but powerful and *extensible* JavaScript task sequencer.

# Installation

## Using NPM

    npm install --save handles.js

# Usage

```javascript
// Create a handle and release it after some time has passed.
// The sequence will block at `doWaitForHandle(blockUntilLaterHandle)` until the handle is released.
var blockUntilLaterHandle = new Handle();
setTimeout(blockUntilLaterHandle.release, 10000);

var sequencer = new Sequencer();

// Enqueue a simple synchronous action
sequencer.do(() => log("1st instantly"));

// Waits for one second then performs an action after the delay has elapsed.
// This also demonstrates "do" task chaining.
sequencer.doWait(1000).do(() => log("2nd after 1 second"));

// Performs an action and waits until release() is called
sequencer.doWaitForRelease(release => setTimeout(release, 3000));

sequencer.do(() => log("3rd after waiting for a release() call"));

// Block until the handle is released
sequencer.doWaitForHandle(blockUntilLaterHandle);

sequencer.do(() => log("4th after waiting for a manually-created handle to be released"));

// Performs an action and waits until release() is called a certain number of times.
// The sequencer proceeds after 5 seconds (when two releases have been performed).
sequencer.doWaitForReleases(2, release => {
  setTimeout(release, 5000);
  setTimeout(release, 3000);
});

sequencer.do(() => log("5th after waiting for two release() calls"));

// Wait for a promise to be fulfilled.
// You can optionally obtain the promise's value and/or rejection reason.
var url = "https://cors-test.appspot.com/test";
sequencer.doWaitForPromise(fetch(url), response => log(`(Promise Resolved : HTTP ${response.status} from ${url})`));

sequencer.do(() => log("6th after waiting for a promise to be resolved"));

sequencer.doSequence(s => {
  s.doWait(1000);
  s.do(() => log(`> Subsequence : First`));
  s.doWait(1000);
  s.do(() => log(`> Subsequence : Second`));
  s.doWait(1000);
  s.do(() => log(`> Subsequence : Third`));
  s.doWait(1000);
});

sequencer.do(() => log("7th after waiting for a subsequence to complete"));
```

# Creating an Extension

An external handles.js extension looks like this:

```javascript
var DoSomethingTask = function (someValue) {
    this.perform = function (handle) {
        // Do something, synchronously or asynchronously
        setTimeout(() => {
          console.log("Task performed after 2 seconds with value " + someValue);
          handle.release(); // Then release the handle to indicate that the task is complete
        }, 2000);
    };
};

Sequencer.prototype.doSomething = function (someValue) {
    this.push(new DoSomethingTask(someValue));
    return this;
}
```

Take a look at core extensions in the handles.js source for concrete examples. The way the
extensions are installed is slightly different from external extensions, but they still
serve as appropriate examples.