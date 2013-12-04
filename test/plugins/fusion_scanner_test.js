var scanner = require('../../plugins/fusion/scanner');

var File = scanner.File;
var Group = scanner.Group;
var Label = scanner.Label;

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

describe('Scanner', function () {
  it('should parse label from data', function () {
    scanner.parseLabel(labelData, function(lbl) {
      lbl.should.be.an.instanceof(Label);
      lbl.id.should.equal(label.id);
      lbl.text.should.equal(label.text);
    });
  });

  it('should parse group from data', function () {
    var count = 0;
    scanner.parseGroup(groupData, function (lbl) {
      lbl.should.be.an.instanceof(Label);
      lbl._group.should.be.an.instanceof(Group);
      count++;
    });
    count.should.equal(2);
  });

  it('should parse file from data', function () {
    var count = 0;
    scanner.parseFile(fileData, function (lbl) {
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
