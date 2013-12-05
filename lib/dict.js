'use strict';

var _ = require('lodash');

function Dict(text) {
  if (text) {
    this._entries = JSON.parse(text);
  } else {
    this._entries = [];
  }
}

Dict.prototype.addEntry = function (entry) {
  this._entries.push(entry);
};

exports = module.exports = Dict;

Dict.prototype.stringify = function () {
  return JSON.stringify(this._entries);
};

Dict.prototype.iterate = function (fn) {
  this._entries.forEach(function (entry, index) {
    fn(entry, index);
  });
};

/* export dictionary to format */
Dict.prototype.toArray = function (type, lang) {
  var array = [];
  this.iterate(function (entry) {
    var context = _.filter(entry.context, function (ctx) {
        return ctx.type === type;
      });

    var strings = lang ?
      _.pick(entry.strings, lang) :
      entry.strings;

    _.each(context, function (ctx) {
      // TODO: solve name conflict in language Id and context keys
      array.push(_.merge(strings, ctx.data));
    });
  });

  return array;
};

/* create a proxy for https://github.com/wdavidw/node-csv */
/* import: dict.csv(options).to(); */
/* export: dict.csv(options).from(); */

var csv = require('csv');

Dict.prototype.csv = function () {
  var proxy = {};
  var array = this.toArray.apply(this, arguments);
  proxy.to = csv().from.array(array).to;
  return proxy;
};
