var fusion = require('../../lib/plugins/fusion').Scanner;

var File = fusion.File;
var Group = fusion.Group;
var Label = fusion.Label;

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

var strings = {};
strings[file.lang] = label.text;
var entry = {
  'strings': strings,
  'context': [
    {
      'type': file.type,
      'data': {
        'group': group.id,
        'label': label.id
      }
    }
  ]
};

describe('Fusion for Fusion language file', function () {
  it('should export TYPE', function () {
    fusion.should.have.properties('TYPE');
  });

  it('should parse label from data', function () {
    fusion.parseLabel(labelData, function(lbl) {
      lbl.should.be.an.instanceof(Label);
      lbl.id.should.equal(label.id);
      lbl.text.should.equal(label.text);
    });
  });

  it('should parse group from data', function () {
    var count = 0;
    fusion.parseGroup(groupData, function (lbl) {
      lbl.should.be.an.instanceof(Label);
      lbl._group.should.be.an.instanceof(Group);
      count++;
    });
    count.should.equal(2);
  });

  it('should parse file from data', function () {
    var count = 0;
    fusion.parseFile(fileData, function (lbl) {
      lbl.should.be.an.instanceof(Label);
      lbl._file.should.be.an.instanceof(File);
      count++;
    });
    count.should.equal(4);
  });

  it('should convert label to entry', function () {
    label.group(group).file(file);
    label.toEntry().should.eql(entry);
  });
});
