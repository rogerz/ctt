#!/usr/bin/env node

'use strict';

var fs = require('fs');
var program = require('commander');
var pkg = require('../package');
var ctt = require('../lib');
var Dict = require('../lib/dict');

var plugin;

program
  .version(pkg.version)
  .option('-i, --in <filename>', 'Language file to be parsed. If not specified, defaults to stdin')
  .option('-o, --out <filename>', 'The output file. If not specified, defaults to stdout')
  .option('-t, --type <type>', 'File type');

function output(data) {
  if (program.out) {
    try {
      fs.writeFileSync(program.out, data, 'utf8');
    } catch (e) {
      console.error('Failed to write file %s', program.out);
      process.exit(-1);
    }
  } else {
    process.stdout.write(data);
  }
}

function input(text) {
  var dict = new Dict();
  plugin.scan(text, function (entry) {
    dict.addEntry(entry);
  });
  output(dict.stringify());
}

function run() {
  var text = '';
  plugin = ctt.getPlugin(program.type || 'fusion');

  if (program.in) {
    try {
      text = fs.readFileSync(program.in);
    } catch (e) {
      console.error('Failed to read file %s', program.in);
    }
    input(text);
  } else {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', function (d) {
      text += d;
    });
    process.stdin.on('end', function() {
      input(text);
    });
  }
}

function main() {
  var argv = process.argv;
  program.parse(argv);
  run();
}

module.exports = program;

if (module.parent === null) {
  main();
}
