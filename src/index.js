'use strict';

var messageHandler =  require('./message_handler.js')

exports.handler = (event, context, callback) => {

  if( ! event.config ) {
    callback("event.config missing");
    return;
  }

  if(event.update.message) {
    messageHandler.handleMessage(event.update.message, event.config, callback);
  }

};
