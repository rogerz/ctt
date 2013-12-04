'use strict';

var printer = require('../../lib/plugins/fusion/printer');

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

});
