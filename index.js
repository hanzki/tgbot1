'use strict';

var request = require('request');

exports.handler = (event, context, callback) => {

  //Lets configure and request
  request({
      url: 'https://api.telegram.org/' + event.config.telegramBotToken +  '/sendmessage', //URL to hit
      method: 'POST',
      //Lets post the following key/values as form
      json: {
          chat_id: event.update.message.chat.id,
          text: event.update.message.text.split("").reverse().join("")
      }
  }, function(error, response, body){
      if(error) {
          console.log(error);
          callback(error);
      } else {
          console.log(response.statusCode, body);
          callback(null, "Ok");
  }
  });
};
