'use strict';

var Entry = require('../lib/entry');

describe('Entry', function () {
  var entry;
  beforeEach(function () {
    entry = new Entry();
  });
  it('should have strings and context', function () {
    entry.strings.should.be.an.instanceof(Object);
    entry.context.should.be.an.instanceof(Array);
  });
  it('should add string', function () {
    entry.addString('en', 'hello');
    entry.strings.should.eql({
      'en': 'hello'
    });
  });
  it('should add context', function () {
    entry.addString('en', 'hello').addContext('fusion', {group: 1, label: 1});
    entry.should.eql({
      'strings': {
        'en': 'hello'
      },
      'context': [{
        'type': 'fusion',
        'data': {
          'group': 1,
          'label': 1
        }
      }]
    });
  });
  it('should extract information', function () {
    entry.addString('en', 'hello').addContext('fusion', {group: 1, label: 1});
    entry.extract('en', 'fusion', function (text, ctx) {
      text.should.eql('hello');
      ctx.should.eql({group: 1, label: 1});
    });
  });
});
