'use strict';

var _ = require('highland');

module.exports.parseCommand = (message, callback) => {
  if( !message || !message.entities) {
    callback();
    return;
   }

  _(message.entities).findWhere({type: 'bot_command', offset: 0}).map((firstCommand) => {
    var command = message.text.substring(firstCommand.offset, (firstCommand.offset + firstCommand.length)).toLowerCase();
    var args = message.text.substring(firstCommand.offset + firstCommand.length).split(" ").filter(Boolean);
    return {command: command, args: args};
  }).toCallback(callback);

};
