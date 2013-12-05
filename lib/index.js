'use strict';

var plugins = {
  'fusion': require('../plugins/fusion')
};


exports.getPlugin = function (type) {
  return plugins[type];
};
