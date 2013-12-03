'use strict';

var xml2js = require('xml2js');
var inspect = require('eyes').inspector({maxLength: false, stream: null});

var debug = require('debug');

var error = debug('parser:fusion:error');
var log = debug('parser:fusion:log');
var verbose = debug('parser:fusion:verbose');

var TYPE = exports.TYPE = 'fusion';

var File = exports.File = function (langId) {
  this.lang = langId;
  this.type = TYPE;
};

var Group = exports.Group = function (groupId) {
  this.id = groupId;
};

var Label = exports.Label = function (id, text) {
  this.id = id;
  this.text = text;
};

Label.prototype.group = function (group) {
  if (group) {
    this._group = group;
    return this;
  } else {
    return this._group;
  }
};

Label.prototype.file = function (file) {
  if (file) {
    this._file = file;
    return this;
  } else {
    return this._file;
  }
};

var Entry = require('../../entry');

Label.prototype.toEntry = function () {
  if (!(this._group && this._file)) {
    error('Invalid label: ' + inspect(this));
    return;
  }

  var entry = new Entry().lang(this._file.lang, this.text)
  .ctx(this._file.type, {
    'group': this._group.id,
    'label': this.id
  });

  return entry;
};

/* parse label and return the normalized result
 * @param label {json}
 * @param fn {function} (err, result)
 *
 * result = {
 *   id: labelId,
 *   text: "label text"
 * }
*/
var parseLabel = exports.parseLabel = function (label, fn) {
  var result;

  try {
    result = new Label(label['$']['id'], label['_']);
  } catch (e) {
    error('Invalid label:' + inspect(label));
  }

  if (fn) {
    fn(result);
  }
};

/* parse group and emit label with group info
 * @param data {json}
 * @param fn {function} (Label)
 */
var parseGroup = exports.parseGroup = function (data, fn) {
  var group;
  var labels;

  try {
    group = new Group(data['$']['id']);
    labels = data['Label'];
  } catch(e) {
    error('Invalid data: ' + inspect(data));
  }

  if (!labels) {
    log('empty group');
    return;
  }
  labels.forEach(function (data) {
    parseLabel(data, function (label) {
      if (fn) {
        fn(label.group(group));
      }
    });
  });
  log('labels parsed: ' + labels.length);
};

var parseFile = exports.parseFile = function (data, fn) {
  try {
    var file = new File(
      data['$']['languageId']
    );
    var groups = data['Group'];

    if (!groups) {
      return;
    }

    groups.forEach(function (data) {
      parseGroup(data, function (label) {
        fn(label.file(file));
      });
    });
    log('groups processed:' + groups.length);
  } catch (e) {
    error('invalid data: ' + inspect(data));
  }
};

exports.parseString = function (str, fn) {
  xml2js.parseString(str, function (err, data) {
    verbose(inspect(data));
    var file = data['FusionLanguageFile'];

    parseFile(file, function(label){
      if (fn) {
        fn(label.toEntry());
      }
    });
  });
};
