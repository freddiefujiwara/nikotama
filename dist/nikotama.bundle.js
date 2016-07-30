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
	  if (typeof target.addEventListener === 'function') {
	    target.addEventListener(event, callback, false)
	  } else if (typeof target.attachEvent === 'function') {
	    target.attachEvent(event, callback)
	  }
	}
	/**
	 * parseURL
	 * @instance
	 * @memberOf Nikotama
	 * @param {String} url
	 * @return {Object} {protocol:"protocol",hostname:"hostname",port:"port",pathname:"pathname",query:"query",hash:"hash",host:"host"}
	 */
	Nikotama.prototype.parseURL = function (url) {
	  var a = document.createElement('a')
	  a.href = url
	  return {
	    protocol: a.protocol,
	    hostname: a.hostname,
	    port: a.port,
	    pathname: a.pathname,
	    query: a.search,
	    hash: a.hash,
	    host: a.host
	  }
	}
	/**
	 * xhr
	 * @instance
	 * @memberOf Nikotama
	 * @param {String} url
	 * @param {Function} callback
	 */
	Nikotama.prototype.xhr = function (url, callback) {
	  var xhr = typeof window.ActiveXObject !== 'undefined'
	        ? new window.ActiveXObject('Microsoft.XMLHTTP') // IE < 9
	        : new window.XMLHttpRequest()

	  if (xhr) {
	    xhr.open('GET', url, true)
	    xhr.onreadystatechange = function () {
	      if (xhr.readyState === 4 &&
	          xhr.status === 200 &&
	          typeof callback === 'function') {
	        callback(JSON.parse(xhr.responseText))
	      }
	    }
	    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
	    xhr.send()
	  }
	}

	module.exports = new Nikotama()


/***/ }
/******/ ]);