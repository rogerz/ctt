'use strict';

var plugins = {};

exports.parseString = function (type, str, fn) {
  var plugin = plugins[type];
  if (!plugin) {
    throw new Error('Unknown plugin: ' + type);
  }
  plugin.Scanner.parseString(str, fn);
};

var register = exports.register = function (type, plugin) {
  plugins[type] = plugin;
};

var fusion = require('./plugins/fusion');
register('fusion', fusion);
