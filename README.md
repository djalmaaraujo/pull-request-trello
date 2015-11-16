# Pull Request For Trello

[![NPM version](http://img.shields.io/npm/v/prtrello.svg?style=flat)](http://npmjs.org/prtrello)
[![NPM downloads](http://img.shields.io/npm/dm/prtrello.svg?style=flat)](http://npmjs.org/prtrello)
[![Dependencies Status](https://david-dm.org/djalmaaraujo/pull-request-trello.png?style=flat)](https://david-dm.org/djalmaaraujo/prtrello)
[![License](http://img.shields.io/npm/l/prtrello.svg?style=flat)](http://npmjs.org/prtrello)

Create a Pull Request Using Trello Card Information Automatically :shipit:

## Install
```bash
[sudo] npm install -g prtrello
```

## Configuration
Run  ```prtrello``` for the first time and you will be requested to setup your Github credentials and Trello Token.

:exclamation: :exclamation: :exclamation: **Important:** If you have the version ```1.0.3``` or earlier, please remove your ~/prtrello.json file and install prtrello again. The new version needs a ```WRITE``` permission on trello and because of that you need to re-install your credentials.

## About Trello Token
Since trello uses OAuth to authenticate, the tool can't get a fresh token automatically. With that in mind, you need to access [https://trello.com/1/authorize?key=31bf1b83dbdaeb38fe6a7b29ef9132de&name=prtrello&expiration=never&response_type=token&scope=read,write](https://trello.com/1/authorize?key=31bf1b83dbdaeb38fe6a7b29ef9132de&name=prtrello&expiration=never&response_type=token&scope=read,write) to get a new token. This token has no expiration date.

## About Github Personal Access Token
You will need to use a personal access token from github. You can generate one in this page here [https://github.com/settings/tokens](https://github.com/settings/tokens)
![image](https://raw.githubusercontent.com/djalmaaraujo/pull-request-trello/master/screenshot-gh.png)

## How the PR looks like:
Title: [#shortTaskId] The title of the card
Description: the shortlink of the task

Ex:

![image](https://raw.githubusercontent.com/djalmaaraujo/pull-request-trello/master/screenshot.png)

## Usage
After your setup, the next time you use the tool you will receive these questions:
```
[Github]: Enter the repository name: [djalmaaraujo/pull-request-trello]:
[Github]: Enter the title or use this: [#3whHnQaF] PR trello test card:
[Github]: Enter the description or use this: https://trello.com/c/3whHnQaF:
[Github]: Do you have any extra comments? Leave blank for nothing:
[Github]: Enter the branch name of your task: [new-trello-id]:
[Github]: This pull-request should be merge into: [master]:
[Github]:  Opening Pull Request...
#############################################################################
PR Opened (https://github.com/djalmaaraujo/pull-request-trello/pull/7)
#############################################################################
#############################################################################
[Trello] Adding Pull Request url to the card...
https://trello.com/c/3whHnQaF/
Done.
#############################################################################

At this time, your pull-request is open and the PR url is posted on your trello task.
```

## Shortcut
You can use ```prtrello -t taskID``` to skip the task question.

## License
[MIT License](http://djalmaaraujo.mit-license.org)
