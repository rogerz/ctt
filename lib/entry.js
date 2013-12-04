'use strict';

function Entry() {
  this.strings = {};
  this.context = [];
}

/*
 * Add a new language string
 *
 * @param langId {string} - language id
 * @param text {string} - language string
 * @retval this
 */
Entry.prototype.addString = function (langId, text) {
  this.strings[langId] = text;
  return this;
};

/*
 * Append a new context
 *
 * @param type {string} - type of context
 * @param data {object} - context object
 */
Entry.prototype.addContext = function (type, data) {
  this.context.push({
    type: type,
    data: data
  });
  return this;
};

/*
 * Extract content from entry
 *
 * @param langId {string} - language to be extracted
 * @param type {string} - type of context to be extracted
 * @param fn {function} - fn(text, ctx) is called for each matching context
 */
Entry.prototype.extract = function (langId, type, fn) {
  if (!fn) {
    return this;
  }

  var text = this.strings[langId];

  if (!text) {
    return this;
  }

  this.context.forEach(function (ctx) {
    if (ctx.type === type) {
      fn(type, ctx);
    }
  });
  return this;
};

exports = module.exports = Entry;
