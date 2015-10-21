#!/usr/bin/env node

var program = require('commander');
var colors  = require('colors');
var app     = require('./src/app');

colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

program
  .version('0.0.1')
  .option('-r, --reset', 'reset credentials', app.reset)

program.on('--help', function(){
  console.log('  Github PR for Trello Cards');
  console.log('');
  console.log('    $ prtrello # This will start the commit');
  console.log('    The tool will ask for:');
  console.log('       1. Github Repository: woboinc/hpb');
  console.log('       2. Trello Card ID: FcRlVtLv');
  console.log('       3. Trello Card Title: Get the default from the card');
  console.log('');
});

if (process.argv.length == 2) {
  app.start();
}

program.parse(process.argv);
