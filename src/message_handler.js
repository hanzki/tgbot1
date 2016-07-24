'use strict';

var request = require('request');

var _handleMessage = (message, config, callback) => {

  console.log("Message received:", message);

  var response = "";

  if(message.text === "Meow") {
    response = "Meow!";
  } else {
    response = _reverseString(message.text);
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

var _reverseString = (string) => {
  return string.split("").reverse().join("");
};

module.exports = {
  handleMessage: _handleMessage,
  reverseString: _reverseString
}
