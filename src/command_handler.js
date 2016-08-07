'use strict';

var _ = require('highland');
var storage = require('./storage.js');
var telegram = require('./telegram.js');

module.exports.handleCommand = (message, command, config, callback) => {

  switch(command.command){

    case "/store":
      _.wrapCallback(storage.storeValue)(config.ddbTable, command.args[0], command.args[1])
      .flatMap((storeValueResult) => {
        return _.wrapCallback(telegram.sendMessage)({
          chat_id: message.chat.id,
          text: "Stored value for key " + command.args[0]
        }, config.telegramBotToken);
      }).toCallback(callback);
      break;

    case "/get":
      storage.getValue(config.ddbTable, command.args[0], callback);
      _.wrapCallback(storage.getValue)(config.ddbTable, command.args[0])
      .flatMap((getValueResult) => {
        return _.wrapCallback(telegram.sendMessage)({
          chat_id: message.chat.id,
          text: "Value for key " + command.args[0] + " is " + getValueResult.data.Value.S
        }, config.telegramBotToken)
      }).toCallback(callback);
      break;

    default:
      var telegramRequest = {
        chat_id: message.chat.id,
        text: "Received command " + command.command
      };
      telegram.sendMessage(telegramRequest, config.telegramBotToken, callback);
  };

};
