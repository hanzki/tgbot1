'use strict';

var _ = require('highland');
var messageHandler =  require('./message_handler');
var commandHandler =  require('./command_handler');
var util = require('./util.js');
var telegram = require('./telegram.js');

exports.handler = (event, context, callback) => {

  var config = event.config;
  var message = event.update.message;

  if( ! config ) {
    callback("event.config missing");
    return;
  }

  if(message) {
    _.wrapCallback(util.parseCommand)(message).apply((command) => {
      if(command){
        commandHandler.handleCommand(message, command, config, callback);
      } else {
        messageHandler.handleMessage(message, config, callback);
      }
    });
  } else {
    callback(null, "Message skipped");
  }

};
