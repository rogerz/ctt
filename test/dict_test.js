var Dict = require('../lib/dict');

require('should');

describe('Dict', function () {
  var dict;
  beforeEach(function () {
    dict = new Dict();
  });
  it('should provide API', function () {
    dict.addEntry.should.be.type('function');
  });
  it('should stringify entries', function () {
    dict.addEntry({foo:'bar'});
    dict.stringify(null, 2).should.equal('[{"foo":"bar"}]');
  });
});
