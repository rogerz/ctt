'use strict';

var printer = require('../../plugins/fusion/printer');

describe('Printer', function () {
  var label, group, lang;

  beforeEach(function () {
    lang = new printer.LangBuilder('en');
    group = new printer.GroupBuilder('1');
    label = new printer.LabelBuilder('2', 'hello');

    group.addLabel(label);
    lang.addGroup(group);
  });

  describe('LabelBuilder', function () {
    it('should export data', function () {
      label.data().should.eql({
        '$': {
          'id': '2'
        },
        '_': 'hello'
      });
    });
  });

  describe('GroupBuilder', function () {
    it('should export data', function () {
      group.data().should.eql({
        '$': {
          'id': '1'
        },
        'Label': [
          {
            '$': {
              'id': '2'
            },
            '_': 'hello'
          }
        ]
      });
    });
    it('should find existing label', function () {
      group.findLabel('2').should.eql(label);
    });
    it('should create new label when not found', function () {
      var newLabel = new printer.LabelBuilder('3', 'world');
      group.findLabel('3', function () {
        return newLabel;
      }).should.eql(newLabel);
    });
  });

  describe('LangBuilder', function () {
    it('should export data', function () {
      lang.data().should.eql({
        '$': {
          'languageId': 'en'
        },
        'Group': [{
          '$': {
            'id': '1'
          },
          'Label': [{
            '$': {
              'id': '2'
            },
            '_': 'hello'
          }]
        }]
      });
    });
    it('should find group', function () {
      lang.findGroup('1').should.eql(group);
    });
    it('should add new group if not found', function () {
      var newGroup = new printer.GroupBuilder('2');
      lang.findGroup('2', function() {
        return newGroup;
      }).should.eql(newGroup);
    });
  });

  describe('Printer', function () {
    var prn = new printer.Printer('en');
    var Entry = require('../../lib/entry');
    it('should add entry', function () {
      var entry = new Entry().addString('en', 'hello')
        .addContext('fusion', {group: '1', label:'2'});
      prn.addEntry(entry);
      prn.data().should.eql({
        'FusionLanguageFile': {
          '$': {
            'languageId': 'en'
          },
          'Group': [{
            '$': {
              'id': '1'
            },
            'Label': [{
              '$': {
                'id': '2'
              },
              '_': 'hello'
            }]
          }]
        }
      });
    });
    it('should print XML', function () {
      /* jshint multistr:true */
      var xml = '\
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n\
<FusionLanguageFile languageId="en">\n\
  <Group id="1">\n\
    <Label id="2">hello</Label>\n\
  </Group>\n\
</FusionLanguageFile>\n';

      prn.printXML().should.eql(xml);
    });
  });
});
