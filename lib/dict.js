'use strict';

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
  this._entries.forEach(function (entry) {
    fn(entry);
  });
};
