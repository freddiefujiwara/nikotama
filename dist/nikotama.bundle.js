/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	window.$nikotama = __webpack_require__(1)


/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 * Nikotama
	 * @class
	 * @name Nikotama
	 */
	'use strict'
	var Nikotama = function () {
	  this.JSONPCount = 0
	}
	/**
	 * get
	 * @instance
	 * @memberOf Nikotama
	 * @param {String} url
	 * @param {Function} callback
	 * @param {String} JSONPCallback
	 */
	Nikotama.prototype.get = function (url, callback, JSONPCallback) {
	  // create <script async="" src="[url]" type="application/javascript"></script>
	  var script = document.createElement('script')
	  script.async = true
	  script.src = this.setJSONPFunction(url, callback, JSONPCallback)
	  script.type = 'application/javascript'
	  var head = document.getElementsByTagName('head')[0]
	  head.appendChild(script)
	  // prevent to duplicate of callback function name
	  this.JSONPCount++
	}
	/**
	 * setJSONPFunction
	 * @instance
	 * @memberOf Nikotama
	 * @param {String} url
	 * @param {Function} callback
	 * @param {String} JSONPCallback
	 * @return {String} JSONP URL
	 */
	Nikotama.prototype.setJSONPFunction = function (url, callback, JSONPCallback) {
	  // generate temporary functoin for JSONP
	  var pad = function (n) { return n < 10 ? '0' + n : n }
	  if (typeof JSONPCallback === 'undefined') {
	    var d = new Date()
	    JSONPCallback = '__nikotama_cb_'
	    JSONPCallback += d.getFullYear()
	    JSONPCallback += pad(d.getMonth() + 1)
	    JSONPCallback += pad(d.getDate())
	    JSONPCallback += this.JSONPCount
	  }
	  // set global function
	  window[JSONPCallback] = function (data) {
	    try {
	      callback(data)
	    } catch (e) {}
	    // cleaning
	    window[JSONPCallback] = undefined
	  }
	  // add callback function to end of the url
	  url += (url.indexOf('?') === -1) ? '?callback=' + JSONPCallback : '&callback=' + JSONPCallback
	  return url
	}
	/**
	 * on
	 * @instance
	 * @memberOf Nikotama
	 * @param {Dom} target
	 * @param {String} event
	 * @param {Function} callback
	 */
	Nikotama.prototype.on = function (target, event, callback) {
	  if (document.addEventListener) {
	    target.addEventListener(event, callback, false)
	  } else if (document.attachEvent) {
	    target[event + callback] = function () { return callback.apply(target, arguments) }
	    target.attachEvent('on' + event, target[event + callback])
	  }
	}

	module.exports = new Nikotama()


/***/ }
/******/ ]);