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
  .version('1.0.2')
  .option('-r, --reset', 'reset credentials', app.reset)
  .option('-t, --task [value]', 'pass the task', function (taskId) {
    app.start(taskId);
  });

if (process.argv.length == 2) {
  app.start();
}

program.parse(process.argv);
