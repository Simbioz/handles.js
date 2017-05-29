module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = {
	  Handle: __webpack_require__(1),
	  CounterHandle: __webpack_require__(2)
	};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	"use strict";
	
	var Handle = function Handle(onRelease) {
	  var that = this;
	  var onReleaseHandlers = [];
	
	  if (!(typeof onRelease === "undefined")) onReleaseHandlers.push(onRelease);
	
	  function callReleaseHandlers() {
	    onReleaseHandlers.forEach(function (handler) {
	      return handler();
	    });
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

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";
	
	var CounterHandle = function CounterHandle(count, onRelease) {
	  var that = this;
	  var onReleaseHandlers = [];
	
	  if (count === 0) throw new Error("Count must be greater than zero!");
	
	  if (!(typeof onRelease === "undefined")) onReleaseHandlers.push(onRelease);
	
	  function callReleaseHandlers() {
	    onReleaseHandlers.forEach(function (handler) {
	      return handler();
	    });
	  }
	
	  this.isReleased = false;
	  this.releaseCount = 0;
	
	  this.addOnReleaseHandler = function (handler) {
	    onReleaseHandlers.push(handler);
	  };
	
	  this.release = function () {
	    if (that.isReleased) return;
	    that.releaseCount += 1;
	    if (that.releaseCount === count) {
	      that.isReleased = true;
	      callReleaseHandlers();
	    }
	  };
	
	  this.releaseAll = function () {
	    if (that.isReleased) return;
	    that.isReleased = true;
	    callReleaseHandlers();
	  };
	};
	
	module.exports = CounterHandle;

/***/ })
/******/ ]);
//# sourceMappingURL=handles.js.map