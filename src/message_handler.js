'use strict';

var request = require('request');

exports.handleMessage = (message, config, callback) => {

  console.log("Message received:", message)

  var response = ""

  if(message.text === "Meow") {
    response = "Meow!"
  } else {
    response = message.text.split("").reverse().join("")
  }

  //Lets configure and request
  request({
      url: 'https://api.telegram.org/' + config.telegramBotToken + '/sendmessage', //URL to hit
      method: 'POST',
      //Lets post the following key/values as form
      json: {
          chat_id: message.chat.id,
          text: response
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
