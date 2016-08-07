'use strict';

var _ = require('highland');
var storage = require('./storage.js');
var telegram = require('./telegram.js');

module.exports.handleCommand = (message, command, config, callback) => {

  switch(command.command){

    case "/store":
      storage.storeValue(config.ddbTable, command.args[0], command.args[1], callback);
      break;

    case "/get":
      storage.getValue(config.ddbTable, command.args[0], callback);
      break;

    default:
      var telegramRequest = {
        chat_id: message.chat.id,
        text: "Received command " + command.command
      };
      telegram.sendMessage(telegramRequest, config.telegramBotToken, callback);
  };

};
