'use strict';

angular.module('denodeify', [])

.factory('denodeify', ['$q', function ($q) {
  return function denodeify(nodeStyleFunction, receiver) {
    return function () {
      var args = Array.prototype.slice.call(arguments, 0);
      var context = receiver || this;
      return $q(function (resolve, reject) {
        var callback = function (error, result) {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        };
        args.push(callback);
        nodeStyleFunction.apply(context, args);
      });
    };
  };
}]);