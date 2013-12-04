'use strict';

var LabelBuilder = exports.LabelBuilder = function (id, text) {
  this.id = id;
  this.text = text;
};

LabelBuilder.prototype.data = function () {
  return {
    '$': this.id,
    '_': this.text
  };
};

var GroupBuilder = exports.GroupBuilder = function (groupId) {
  this.id = groupId;
  this.labels = [];
};

GroupBuilder.prototype.data = function () {
  var labelData = [];
  this.labels.forEach(function (label) {
    labelData.push(label.data());
  });

  return {
    '$': {
      'id': this.id
    },
    'Label': labelData
  };
};

var LangBuilder = exports.LangBuilder = function (langId) {
  this.id = langId;
  this.groups = [];
};

LangBuilder.prototype.data = function () {
  var grpData = [];
  this.groups.forEach(function (group) {
    grpData.push(group.data());
  });
  return {
    '$': {
      // TODO: build all attributes, e.g. xmlns, languageName, ...
      'languageId': this.lang
    },
    'Group': grpData
  };
};

LangBuilder.prototype.addGroup = function (group) {
  this.groups.push(group);
};

LangBuilder.prototype.findGroup = function (groupId, createDefault) {
  var group;

  for (var i = 0; i < this.groups.length; i++) {
    group = this.groups[i];
    if (group.id === groupId) {
      return group;
    }
  }

  group = createDefault();
  this.addGroup(group);
  return group;
};

var Printer = exports.Printer = function (langId) {
  this.lang = new LangBuilder(langId);
};

Printer.prototype.data = function () {
  return {
    'FusionLanguageFile': this.lang.data()
  };
};

var plugin = require('./index');

Printer.prototype.addNode = function (entry) {
  var self = this;
  entry.extract(this.lang.id, plugin.TYPE, function (text, ctx) {
    var group = self.lang.findGroup(ctx.group, function () {
      return new GroupBuilder(ctx.group);
    });
    group.findLabel(ctx.label, function () {
      return new LabelBuilder(ctx.label, text);
    });
  });
};
