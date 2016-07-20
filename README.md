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
$.get('https://api.github.com/users/freddiefujiwara',function(data){console.log(data);});
```
