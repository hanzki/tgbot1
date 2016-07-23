'use strict';

var request = require('request')

console.log('Loading function');

exports.handler = (event, context, callback) => {

  callback(null, "Ok");
  return(0);

  //Lets configure and request
  request({
      url: 'https://api.telegram.org/' + event.token +  '/sendmessage', //URL to hit
      method: 'POST',
      //Lets post the following key/values as form
      json: {
          chat_id: event.update.message.chat.id,
          text: 'bot: ' + event.update.message.text
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
