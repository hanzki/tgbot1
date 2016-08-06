'use strict';

var _ = require('highland');
var messageHandler =  require('./message_handler');
var util = require('./util.js');
var telegram = require('./telegram.js');

exports.handler = (event, context, callback) => {

  if( ! event.config ) {
    callback("event.config missing");
    return;
  }

  if(event.update.message) {
    _.wrapCallback(util.parseCommand)(event.update.message).apply((command) => {
      if(command){
        console.log(command);

        var telegramRequest = {
          chat_id: message.chat.id,
          text: "Received command " + command.command
        };

        telegram.sendMessage(telegramRequest, event.config.telegramBotToken, callback);

      } else {
        messageHandler.handleMessage(event.update.message, event.config, callback);
      }
    });
  } else {
    callback(null, "Message skipped");
  }

};
