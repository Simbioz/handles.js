let Handle = function (onRelease) {
  let that = this;
  let onReleaseHandlers = [];

  if (!(typeof onRelease === "undefined"))
    onReleaseHandlers.push(onRelease);

  function callReleaseHandlers() {
    onReleaseHandlers.forEach(handler => handler());
  }

  this.isReleased = false;

  this.addOnReleaseHandler = function (handler) {
    onReleaseHandlers.push(handler);
  };

  this.release = function () {
    if (that.isReleased) return;
    that.isReleased = true;
    callReleaseHandlers();
  };
};

module.exports = Handle;
