var parser = require('../../lib/parsers/fusion');

var File = parser.File;
var Group = parser.Group;
var Label = parser.Label;

var label = new Label('1', 'text');
var labelData = {
  '$': {
    'id': label.id
  },
  '_': label.text
};

var group = new Group('2');
var groupData = {
  '$': {
    'id': group.id
  },
  'Label': [
    labelData,
    labelData
  ]
};

var file = new File('en');
var fileData = {
  '$': {
    'languageId': file.lang
  },
  'Group':[
    groupData,
    groupData
  ]
};

describe('Parser for Fusion language file', function () {
  it('should export TYPE', function () {
    parser.should.have.properties('TYPE');
  });

  it('should parse label from data', function () {
    parser.parseLabel(labelData, function(lbl) {
      lbl.should.be.an.instanceof(Label);
      lbl.id.should.equal(label.id);
      lbl.text.should.equal(label.text);
    });
  });

  it('should parse group from data', function () {
    var count = 0;
    parser.parseGroup(groupData, function (lbl) {
      lbl.should.be.an.instanceof(Label);
      lbl._group.should.be.an.instanceof(Group);
      count++;
    });
    count.should.equal(2);
  });

  it('should parse file from data', function () {
    var count = 0;
    parser.parseFile(fileData, function (lbl) {
      lbl.should.be.an.instanceof(Label);
      lbl._file.should.be.an.instanceof(File);
      count++;
    });
    count.should.equal(4);
  });
});
