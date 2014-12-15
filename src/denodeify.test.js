/* globals getService, Q */

'use strict';

describe('denodeify', function () {

  beforeEach(angular.mock.module('denodeify'));
  beforeEach(module(function ($provide) {
    $provide.service('$q', function () {
      return function (fn) {
        return Q.Promise(fn);
      };
    });
  }));

  function nodeStyleFunction(arg1, arg2, callback) {
    var action;
    if (arg1 === arg2) {
      // Consider this the success case.
      action = function () {
        callback(null, arg1 + arg2);
      };
    } else {
      // The failure case.
      action = function () {
        callback('Error');
      };
    }
    setTimeout(action);
  }

  it('should denodeify a basic node function and handle success', function () {
    var denodeify = getService('denodeify');
    var denodeified = denodeify(nodeStyleFunction);
    return denodeified(1, 1)
      .then(function (value) {
        expect(value).to.equal(2);
      });
  });

  it('should denodeify a basic node function and handle error', function () {
    var denodeify = getService('denodeify');
    var denodeified = denodeify(nodeStyleFunction);
    return denodeified(1, 2)
      .then(function (value) {
        throw new Error('Should have been called');
      })
      .then(null, function (error) {
        expect(error).to.equal('Error');
      });
  });
});