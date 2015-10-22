# Pull Request For Trello
=========================

[![NPM version](http://img.shields.io/npm/v/prtrello.svg?style=flat)](http://npmjs.org/prtrello)
[![NPM downloads](http://img.shields.io/npm/dm/prtrello.svg?style=flat)](http://npmjs.org/prtrello)
[![Dependencies Status](https://david-dm.org/djalmaaraujo/pull-request-trello.png?style=flat)](https://david-dm.org/djalmaaraujo/prtrello)
[![License](http://img.shields.io/npm/l/prtrello.svg?style=flat)](http://npmjs.org/prtrello)

Create a Pull Request Using Trello Card Information Automatically

## Install
```bash
npm install -g prtrello
```

## Configuration
Run  ```prtrello``` for the first time and you will be requested to setup your Github credentials and Trello Token.

## About Trello Token
Since trello uses OAuth to authenticate, the tool can't get a fresh token automatically. With that in mind, you need to access ```https://trello.com/1/authorize?key=31bf1b83dbdaeb38fe6a7b29ef9132de&name=prtrello&expiration=never&response_type=token``` to get a new token. This token has no expiration date.

## About Github Personal Access Token
You will need to use a personal access token from github. You can generate one in this page here [https://github.com/settings/tokens](https://github.com/settings/tokens)
![image](https://www.dropbox.com/s/bi7062glusx7lz3/Screenshot%202015-10-22%2009.39.54.png?dl=0)

## How the PR looks like:
Title: [#shortTaskId] The title of the card
Description: the shortlink of the task

Ex:

![image](https://raw.githubusercontent.com/cconsultants/pull-request-trello/master/screenshot.png)

## Usage
After your setup, the next time you use the tool you will receive these questions:
```
What is the task ID?: [123456]:
Getting trello card information...
[Github]: Enter the repository name: [woboinc/hpb]:
[Github]: Enter the title or use this: [#74zySCLD] [BUG] Shipping prices should not be displayed with 'est.' on Review & Confirm step of Checkout:
[Github]: Enter the description or use this: https://trello.com/c/74zySCLD:
[Github]: Do you have any extra comments? Leave blank for nothing:
[Github]: Enter the branch name of your task: [djalma/test]:
[Github]: This pull-request should be merge into: [master]:
[Github]: Opening Pull Request...

#####################################################################
Pull Request Sent:https://github.com/woboinc/hpb/pull/291 shipit! :D
#####################################################################

At this time, your default browser will open a new window with the pull-request URL.
```

## License
[MIT License](http://djalmaaraujo.mit-license.org)
