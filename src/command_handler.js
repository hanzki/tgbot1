'use strict';

var _ = require('highland');
var storage = require('./storage.js');
var telegram = require('./telegram.js');

var Command = function(name, args, handler) {
  this.name = name;
  this.args = args;
  this.handler = handler;

  this.usage = "usage: " + name;
  for (let arg of args) { this.usage += " " + arg.name; }
  for (let arg of args) {
    this.usage += "\n" + arg.name + " - " + arg.description
  }

};

Command.prototype.execute = function(args, message, config, callback) {
  if(args.length < this.args.length) {
    telegram.sendMessage({
      chat_id: message.chat.id,
      text: this.usage
    }, config.telegramBotToken, callback);
  } else {
    this.handler(args, message, config, callback);
  }
};

Command.prototype.executeStream = _.wrapCallback(Command.prototype.execute);

var storeCommand = new Command(
  "/store",
  [
    {name: "key", description: "key to save the value under"},
    {name: "value", description: "value to be saved"}
  ],
  (args, message, config, callback) => {
    _.wrapCallback(storage.storeValue)(config.ddbTable, args[0], args[1])
    .flatMap((storeValueResult) => {
      return _.wrapCallback(telegram.sendMessage)({
        chat_id: message.chat.id,
        text: "Stored value for key " + args[0]
      }, config.telegramBotToken);
    }).toCallback(callback);
  }
);

var getCommand = new Command(
  "/get",
  [
    {name: "key", description: "key of the value"}
  ],
  (args, message, config, callback) => {
    _.wrapCallback(storage.getValue)(config.ddbTable, args[0])
    .flatMap((getValueResult) => {
      return _.wrapCallback(telegram.sendMessage)({
        chat_id: message.chat.id,
        text: "Value for key " + args[0] + " is " + getValueResult.Item.Value.S
      }, config.telegramBotToken);
    }).toCallback(callback);
  }
);

var commands = [
  storeCommand,
  getCommand
];

module.exports.handleCommand = (message, command, config, callback) => {

  _(commands)
  .findWhere({name: command.command})
  .flatMap((c) => {
    return c.executeStream(command.args, message, config);
  })
  .otherwise(
    _.wrapCallback(telegram.sendMessage)({
      chat_id: message.chat.id,
      text: "Received command " + command.command
    }, config.telegramBotToken)
  )
  .toCallback(callback);

};
