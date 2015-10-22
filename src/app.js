var prompt = require('prompt');
var github = require('./github');
var trello = require('./trello');
var config = require('./config');
var open   = require('open');

module.exports = {
  start: function (taskID) {
    github.credentials(function () {
      trello.credentials(function () {
        trello.askID(taskID, function (taskID) {
          trello.getCardInfo(taskID, function (card) {
            github.confirmPRDetails(card, function (pullRequest) {
              console.log('[Github]'.green + ': '.white + ' Opening Pull Request...'.warn);

              github.openPR(pullRequest, function (info) {
                console.log('#############################################################################'.help);
                console.log('PR Opened (' + info.html_url.green + ') ' + ' shipit! :D'.silly)
                console.log('#############################################################################'.help);

                open(info.html_url);
              });
            });
          });
        });
      });
    });
  },

  reset: function () {
    config.reset();
  }
};

