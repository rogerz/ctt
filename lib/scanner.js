'use strict';

var parsers = {};

exports.awesome = function() {
  return 'awesome';
};

exports.parseString = function (type, str, fn) {
  var parse = parsers[type];
  if (!parse) {
    throw new Error('Unknown parser: ' + type);
  }
  parse(str, fn);
};

exports.register = function (type, fn) {
  if (typeof fn !== 'function') {
    throw new Error('Must register a function');
  }
  parsers[type] = fn;
};
