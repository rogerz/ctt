function GroupBuilder(groupId) {
  this.id = groupId;
  this.labels = [];
}

GroupBuilder.prototype.data = function () {
  var labelData = [];
  this.lables.forEach(function (label) {
    labelData.push(label.data());
  });

  return {
    '$': {
      'id': this.id
    },
    'Label': labelData
  };
};

function LangBuilder(langId) {
  this.lang = langId;
  this.groups = [];
}

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

var Printer = exports.Printer = function (langId) {
  this.lang = new LangBuilder(langId);
};

Printer.prototype.data = function () {
  return {
    'FusionLanguageFile': this.lang.data()
  };
};

Printer.prototype.addEntry = function () {

};

exports = module.exports = Printer;
