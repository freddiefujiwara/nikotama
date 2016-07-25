[See the document](https://freddiefujiwara.github.io/nikotama/Nikotama.html)

[![Build Status](https://travis-ci.org/freddiefujiwara/nikotama.svg?branch=master)](https://travis-ci.org/freddiefujiwara/nikotama)
[![Coverage Status](https://coveralls.io/repos/github/freddiefujiwara/nikotama/badge.svg?branch=master)](https://coveralls.io/github/freddiefujiwara/nikotama?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

# nikotama
A JavaScript micro-library

#Let's try 
```javascript
var script = document.createElement('script'); 
var head = document.getElementsByTagName('head')[0];
script.src='https://rawgit.com/freddiefujiwara/nikotama/master/dist/nikotama.bundle.js';
script.type='application/javascript';
head.appendChild(script);
// wait for load
$nikotama.get('https://api.github.com/users/freddiefujiwara',function(data){console.log(data);});
```
