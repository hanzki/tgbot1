'use strict';

var request = require('request');
var telegram = require('./telegram.js');

var _handleMessage = (message, config, callback) => {

  console.log("Message received:", message);

  var response = JSON.stringify(message, null, 2)
    .replace(/&/g, "&amp")
    .replace(/</g, "&lt")
    .replace(/>/g, "&gt");

  var telegramRequest = {
    chat_id: message.chat.id,
    text: "<pre>" + response + "</pre>",
    parse_mode: "HTML"
  };

  telegram.sendMessage(telegramRequest, config.telegramBotToken, function(error, data){
      if(error) {
          console.log(error);
          callback(error);
      } else {
          console.log(data.response.statusCode, data.body);
          callback(null, "Ok");
      }
  });

};

var _reverseString = (string) => {
  return string.split("").reverse().join("");
};

module.exports = {
  handleMessage: _handleMessage,
  reverseString: _reverseString
}
