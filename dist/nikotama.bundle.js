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

	window.$nikotama =  __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	var Nikotama = function() {
	    this.JSONPCount = 0;
	};
	Nikotama.prototype.get = function(url,callback){
	    var script   = document.createElement('script');
	    script.async = true;
	    script.src   = this.setJSONPFunction(url,callback);
	    script.type  = 'application/javascript';
	    var head =  document.getElementsByTagName('head')[0];
	    head.appendChild(script);
	    this.JSONPCount++;
	};
	Nikotama.prototype.setJSONPFunction = function(url,callback,JSONPCallback){
	    var pad = function(n) { return n < 10 ? '0' + n : n; };
	    console.log(typeof JSONPCallback);
	    if('undefined' === typeof JSONPCallback){
	        var d = new Date();
	        JSONPCallback = '__nikotama_cb_';
	        JSONPCallback += d.getFullYear();
	        JSONPCallback += pad(d.getMonth()+1);
	        JSONPCallback += pad(d.getDate());
	        JSONPCallback += this.JSONPCount;
	    }
	    window[JSONPCallback] = function(data){
	        try{
	            callback(data);
	        }catch(e){}
	        window[JSONPCallback] = undefined;
	    };
	    url += (-1 === url.indexOf('?')) ? '?callback=' + JSONPCallback : '&callback=' + JSONPCallback;
	    return url;
	};

	module.exports = new Nikotama();


/***/ }
/******/ ]);
