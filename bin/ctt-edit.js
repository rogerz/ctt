#!/usr/bin/env node

'use strict';

var fs = require('fs');
var program = require('commander');
var pkg = require('../package');
var ctt = require('../lib');
var Dict = require('../lib/dict');

program
  .version(pkg.version)
  .option('-i, --in <filename>', 'Source dictionary file. If not specified, defaults to stdin')
  .option('-o, --out <filename>', 'Target language file, defaults to stdout')
  .option('-t, --type <type>', 'Plugin to be used, defaults to "fusion"');

var plugin;

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
  var dict = new Dict(text);
  dict.csv(plugin.TYPE).to.string(function (data) {
    output(data);
  }, plugin.csv.options);
}

// TODO: reuse code in ctt-scanner

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

module.exports = program;

if (module.parent === null) {
  program.parse(process.argv);
  run();
}
