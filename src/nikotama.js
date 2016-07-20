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
