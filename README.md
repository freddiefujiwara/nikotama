[![Build Status](https://travis-ci.org/freddiefujiwara/nikotama.svg?branch=master)](https://travis-ci.org/freddiefujiwara/nikotama)
[![Coverage Status](https://coveralls.io/repos/github/freddiefujiwara/nikotama/badge.svg?branch=feature%2Ftravis)](https://coveralls.io/github/freddiefujiwara/nikotama?branch=feature%2Ftravis)
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
