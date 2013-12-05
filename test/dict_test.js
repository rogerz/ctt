var Dict = require('../lib/dict');

require('should');

var Entry = require('../lib/entry');

describe('Dict', function () {
  var dict, entries;
  beforeEach(function () {
    dict = new Dict();
    entries = [
      new Entry().addString('en', 'hello').addContext('ctx', {'key': 'val1'}),
      new Entry().addString('fr', 'bonjour').addContext('ctx', {'key': 'val2'})
    ];
    entries.forEach(function (e) {
      dict.addEntry(e);
    });
  });
  it('should provide API', function () {
    dict.addEntry.should.be.type('function');
  });
  it('should stringify entries', function () {
    dict.stringify().should.be.type('string');
  });
  it('should iterate entries', function () {
    dict.iterate(function (e, i) {
      e.should.eql(entries[i]);
    });
  });
  it('should export array', function () {
    dict.toArray('ctx', ['en', 'fr']).should.eql([
      { en: 'hello', key: 'val1'},
      { fr: 'bonjour', key: 'val2'}
    ]);
  });
  it('should create a proxy for csv', function () {
    dict.csv().should.have.property('to');
  });
});
