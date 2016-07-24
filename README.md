[![Build Status](https://circleci.com/gh/hanzki/tgbot1.svg?style=shield)](https://circleci.com/gh/hanzki/tgbot1)
[![Telegram](https://patrolavia.github.io/telegram-badge/chat.svg)](https://telegram.me/hanzkitestbot) 
# HanzkiTestBot
Simple Telegram bot for learning Telegram bot API and continous integration.
Say hi to [@HanzkiTestBot](https://telegram.me/hanzkitestbot)!

## Architecture
Bot code is written in NodeJs and supposed to be ran as AWS Lambda function.
AWS API Gateway provides a HTTP webhook for the Telegram API to call.

## Tools
This project uses CircleCI as a CI server. After the build process and tests
pass without errors code is deployed to AWS using Ansible and AWS Cloudformation.

## Thanks
* [Telegram](https://core.telegram.org/bots)
* [CircleCI](https://circleci.com/)
* [Ansible](http://docs.ansible.com/ansible/index.html)
* [Amazon Web Services](https://aws.amazon.com/)
