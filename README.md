This angular module aims to provide promisification services for AngularJS. At
the moment the package provides one service called "denodeify" which is
equivalent to `Q.denodeify()` but using `$q`.

# Installation

You an install `angular-promisify` with Bower:

```bash
  bower install --save angular-promisify
```

You should then add `denodeify.js` (in `dist/`) to your scripts.

# Usage Example:

```js
angular.module('myApp', ['denodeify'])
  .factory('myService', ['denodeify', function(denodeify) {
    var denodeifiedFunction = denodeify(someNodeStyleFunction);

    denodeifiedFunction(someValue)
      .then(function(result) {
        // use the result
      })
      .then(null, function(error) {
        // catch the error
      });
  }]);
```
