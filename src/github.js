var prompt      = require('prompt');
var config      = require('./config');
var credentials = config.readConfig();
var sh          = require('sync-exec');
var request     = require('request');
var GITHUB_API  = 'https://api.github.com';

var Github = {
  credentials: function (cb) {
    if (credentials.github.token) {
      return cb();
    }

    console.log('Setup your github account:'.warn);

    var properties = [
      {
        name: 'token',
        hidden: true,
        required: true
      }
    ];

    prompt.start();

    prompt.get(properties, function (err, result) {
      if (err) {
        console.log('OK, bye!'.error);
        process.exit();
      }

      credentials.github.token = result.token;

      config.saveData(credentials, function () {
        console.log('Github token saved!'.info);

        return cb();
      });
    });
  },

  askRepository: function (cb) {
    var tempRepo = config.readConfig().temp.repository;
    var tempRepoText = '[' + tempRepo + ']';

    prompt.message = 'What is the repository name?';
    prompt.start();

    prompt.get({
      properties: {
        taskId: {
          description: tempRepoText.magenta
        }
      }
    }, function (err, result) {
      return cb((!result.taskId) ? tempRepo : result.taskId);
    });
  },

  confirmPRDetails: function (card, cb) {
    var title       = '[#' + card.shortLink + '] ' + card.name;
    var description = card.shortUrl;
    var comment     = '';
    var tempMergeBranch = config.readConfig().temp.mergeBranch || 'master';

    prompt.message = '[Github]'.green;
    prompt.start();

    prompt.get({
      properties: {
        repository: {
          description: 'Enter the repository name: '.green + '['.magenta + Github.getRepository().magenta + ']'.magenta
        },
        title: {
          description: 'Enter the title or use this: '.green + title.magenta
        },
        description: {
          description: 'Enter the description or use this: '.green + description.magenta
        },
        comment: {
          description: 'Do you have any extra comments? Leave blank for nothing'.green
        },
        branch: {
          description: 'Enter the branch name of your task: '.green + '['.magenta + Github.getBranchName().magenta + ']'.magenta
        },
        mergeBranch: {
          description: 'This pull-request should be merge into: '.green + '['.magenta + tempMergeBranch.magenta + ']'.magenta
        }
      }
    }, function (err, result) {
      if (err) {
        console.log('OK, bye!'.error);
        process.exit();
      }

      var pullRequest = {
        repository:  (result.repository) ? result.repository : Github.getRepository(),
        title:       (result.title) ? result.title : title,
        description: (result.description) ? result.description : description,
        comment:     (result.comment) ? result.comment : comment,
        branch:      (result.branch) ? result.branch : Github.getBranchName(),
        mergeBranch: (result.mergeBranch) ? result.mergeBranch : tempMergeBranch
      }

      Github.savePreferences(pullRequest.mergeBranch, function () {
        cb(pullRequest);
      });
    });
  },

  savePreferences: function(mergeBranch, cb) {
    var configData = config.readConfig();

    configData.temp.mergeBranch = mergeBranch;
    config.saveData(configData, function () {
      return cb();
    });
  },

  openPR: function (pullRequest, cb) {
    credentials = config.readConfig();

    var data = {
      title: pullRequest.title,
      body: pullRequest.description + "\n" + pullRequest.comment,
      head: pullRequest.branch,
      base: pullRequest.mergeBranch
    }

    request({
      url: GITHUB_API + '/repos/' + pullRequest.repository + '/pulls?access_token=' + credentials.github.token,
      method: 'POST',
      body: data,
      json: true,
      headers: {
        'User-Agent': 'prtrello App'
      }
    }, function (error, response, body) {
      if (error) {
        console.log(error.error);
        process.exit();
      }

      if (response.statusCode == 401) {
        console.log('Your github credentials are wrong. Run prtrello -r and then prtrello'.error);
        process.exit();
      }

      if (body.message == 'Validation Failed') {
        console.log('Check for an existing PR for this branch. Also, make sure to Push your branch before opening the PR'.error);
        process.exit();
      }

      cb(body);
    });
  },

  getBranchName: function () {
    var branch = sh('git rev-parse --abbrev-ref HEAD');

    return branch.stdout.toString().trim();
  },

  getRepository: function () {
    var branch  = sh('git remote -v');
    var regex   = new RegExp("github.com:(.*)\.git");
    var matches = regex.exec(branch.stdout);

    return matches[1];
  }
}

module.exports = Github;
