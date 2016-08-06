'use strict';

var request = require('request');

module.exports.sendMessage = function (messageJson, telegramToken, callback) {
  request({
      url: 'https://api.telegram.org/' + telegramBotToken + '/sendmessage',
      method: 'POST',
      json: messageJson
  }, function(error, response, body) {
    callback(error, {response: response, body: body})
  });
};
