var fs         = require('fs');
var file       = process.env['HOME'] + '/prtrello.json';
var BLANK_DATA = {
  appKey: "31bf1b83dbdaeb38fe6a7b29ef9132de",
  github: {
    token: false
  },

  trello:{
    token :false
  },

  temp: {
    taskId: '123456',
    mergeBranch: 'master',
    repository: 'djalmaaraujo/pull-request-trello'
  }
};

module.exports = {
  readConfig: function() {
    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, JSON.stringify(BLANK_DATA));
    }

    var content = fs.readFileSync(file, 'utf8');
    return JSON.parse(content);
  },

  saveData: function (data, cb) {
    fs.writeFileSync(file, JSON.stringify(data));
    cb();
  },

  reset: function () {
    fs.writeFileSync(file, JSON.stringify(BLANK_DATA));
  }
}
