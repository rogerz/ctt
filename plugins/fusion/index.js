'use strict';

exports.scan = require('./scanner').parseString;

exports.Printer = require('./printer').Printer;

exports.csv = {
  options: {
    columns: ['group', 'label', 'en', 'zh-CN', 'fr-CA'],
    header: true
  }
};

exports.TYPE = 'fusion';
