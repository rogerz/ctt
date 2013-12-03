#!/usr/bin/env node

'use strict';

var fs = require('fs');
var program = require('commander');
var pkg = require('../package');
var scanner = require('../lib/scanner');
var Dict = require('../lib/dict');

program
  .version(pkg.version)
  .option('-i, --in <filename>', 'Language file to be parsed. If not specified, defaults to stdin')
  .option('-o, --out <filename>', 'The output file. If not specified, defaults to stdout')
  .option('-t, --type <type>', 'File type')

function outputDict(dict) {
  var output = dict.stringify();
  if (program.out) {
    try {
      fs.writeFileSync(program.out, output, 'utf8');
    } catch (e) {
      console.error('Failed to write file %s', program.out);
      process.exit(-1);
    }
  } else {
    process.stdout.write(output);
  }
}

function run() {
  var text = "";
  if (program.in) {
    try {
      text = fs.readFileSync(program.in);
    } catch (e) {
      console.error('Failed to read file %s', program.in);
    }
    parseInput(text);
  } else {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', function (d) {
      text += d;
    });
    process.stdin.on('end', function() {
      var dict = new Dict();
      var type = program.type || 'fusion';
      scanner.parseString(type, text, function (entry) {
        dict.addEntry(entry);
      });
      outputDict(dict);
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
