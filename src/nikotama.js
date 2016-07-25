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

module.exports = new Nikotama()
