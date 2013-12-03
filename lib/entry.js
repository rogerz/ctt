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
Entry.prototype.lang = function (langId, text) {
  this.strings[langId] = text;
  return this;
};

/*
 * Append a new context
 *
 * @param type {string} - type of context
 * @param data {object} - context object
 */
Entry.prototype.ctx = function (type, data) {
  this.context.push({
    type: type,
    data: data
  });
  return this;
};

exports = module.exports = Entry;
