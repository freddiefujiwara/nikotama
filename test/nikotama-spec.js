'use strict'
var nikotama = require('../src/nikotama.js')
var jsdom = require('jsdom')
var sinon = require('sinon')
var assert = require('assert')
var gd = global.document
var gw = global.window
var gx = global.XMLHttpRequest
var fakeXHR
var requests = []

var currentDate = ''
beforeEach(function () {
  global.document = jsdom.jsdom('<!doctype html><html><head id="head"></head><body><input type="button" id="button"></body></html>')
  global.window = global.document.defaultView
  var pad = function (n) { return n < 10 ? '0' + n : n }
  var d = new Date()
  currentDate = d.getFullYear()
  currentDate += pad(d.getMonth() + 1)
  currentDate += pad(d.getDate())
  fakeXHR = sinon.useFakeXMLHttpRequest()
  global.window.XMLHttpRequest = fakeXHR
  fakeXHR.onCreate = function (xhr) {
    requests.push(xhr)
  }
})

afterEach(function () {
  global.document = gd
  global.window = gw
  nikotama.JSONPCount = 0
  currentDate = ''
  fakeXHR.restore()
  requests = []
})

describe('Nikotama', function () {
  it('should be an object', function () {
    assert.equal('object', typeof nikotama)
  })
  describe('#get', function () {
    it('should be a function', function () {
      assert.equal('function', typeof nikotama.get)
    })
    it('should add the script tag to <head>', function () {
      nikotama.get('http://example.com', function (data) {})
      var head = global.document.getElementById('head')
      assert.equal(0, head.innerHTML.indexOf('<script'))
      assert.equal(1, nikotama.JSONPCount)
    })
  })
  describe('#setJSONPFunction', function () {
    it('should be a function', function () {
      assert.equal('function', typeof nikotama.setJSONPFunction)
    })
    it('should return url(w/o "?") + callback ', function (done) {
      assert.equal('http://example.com?callback=__nikotama_cb_' + currentDate + '0',
                         nikotama.setJSONPFunction('http://example.com', function (data) {
                           assert(true)
                           done()
                         }))

      assert.equal('function', typeof window['__nikotama_cb_' + currentDate + '0'])
      window['__nikotama_cb_' + currentDate + '0']()
    })
    it('should return url(w/ "?") + callback ', function (done) {
      assert.equal('http://example.com?1=1&callback=__nikotama_cb_' + currentDate + '0',
                         nikotama.setJSONPFunction('http://example.com?1=1', function (data) {
                           assert(true)
                           done()
                         }))

      assert.equal('function', typeof window['__nikotama_cb_' + currentDate + '0'])
      window['__nikotama_cb_' + currentDate + '0']()
    })
    it('should adopt fixed callback function ', function (done) {
      assert.equal('http://example.com?1=1&callback=shinagawa_cb',
                         nikotama.setJSONPFunction('http://example.com?1=1', function (data) {
                           assert(true)
                           done()
                         }, 'shinagawa_cb'))

      assert.equal('function', typeof window['shinagawa_cb'])
      window['shinagawa_cb']()
    })
  })
  describe('#on', function () {
    it('should be a function', function () {
      assert.equal('function', typeof nikotama.on)
    })
    it('should add event handler ', function (done) {
      var button = global.document.getElementById('button')
      nikotama.on(button, 'click', function (data) { done() })
            // emulate click event
      var evt = document.createEvent('HTMLEvents')
      evt.initEvent('click', false, true)
      button.dispatchEvent(evt)
    })
    it('should atach event handler ', function (done) {
      var button = global.document.getElementById('button')
            // fake attachEvent
      button.attachEvent = button.addEventListener
      button.addEventListener = undefined
      nikotama.on(button, 'click', function (data) { done() })
            // emulate click event
      var evt = document.createEvent('HTMLEvents')
      evt.initEvent('click', false, true)
      button.dispatchEvent(evt)
            // cleaning
      button.addEventListener = button.attachEvent
      button.attachEvent = undefined
    })
  })
  describe('#parseURL', function () {
    it('should be a function', function () {
      assert.equal('function', typeof nikotama.parseURL)
    })
    it('should parse', function () {
      assert.deepEqual(nikotama.parseURL('https://example.com:8080/pathname/?key=val#hash'),
            { protocol: 'https:',
                hostname: 'example.com',
                port: '8080',
                pathname: '/pathname/',
                query: '?key=val',
                hash: '#hash',
                host: 'example.com:8080' })
    })
  })
  describe('#xhr', function () {
    it('should be a function', function () {
      assert.equal('function', typeof nikotama.xhr)
    })
    it('should call & parse for api', function () {
      var callback = sinon.spy()
      nikotama.xhr('https://example.com/api', callback)
      assert.equal(1, requests.length)
      requests[0].respond(200,
                          { 'Content-Type': 'application/json' },
                          '[{ "id": 1, "name": "Fumikazu Fujiwara" }]')
      assert.ok(callback.calledWith([{ id: 1, name: 'Fumikazu Fujiwara' }]))
    })
    it('should not call & parse for  wrongapi', function () {
      var callback = sinon.spy()
      nikotama.xhr('https://example.com/wrongapi', callback)
      assert.equal(1, requests.length)
      requests[0].respond(400,
                          { 'Content-Type': 'application/json' },
                          '[{ "id": 1, "name": "Fumikazu Fujiwara" }]')
      assert.ok(callback.neverCalledWith([{ id: 1, name: 'Fumikazu Fujiwara' }]))
    })
  })
})
