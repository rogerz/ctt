'use strict';

function Dict() {
  this._entries = [];
}

Dict.prototype.addEntry = function (entry) {
  this._entries.push(entry);
};

exports = module.exports = Dict;

Dict.prototype.stringify = function () {
  return JSON.stringify(this._entries);
};
