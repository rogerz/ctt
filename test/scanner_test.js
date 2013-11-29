'use strict';

var scanner = require('../lib/scanner.js');
require('should');

describe('Scanner', function () {
  it('should provide API', function () {
    scanner.parseString.should.be.type('function');
    scanner.register.should.be.type('function');
  });
});
