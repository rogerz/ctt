function Dict() {
  this._entries = [];
}

Dict.prototype.addEntry = function (entry) {
  this._entries.push(entry);
};

exports = module.exports = Dict;
