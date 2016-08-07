var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect; // we are using the "expect" style of Chai
var commandHandler = require('./../src/command_handler');
var telegram = require('./../src/telegram');
var util = require('./../src/util');
var storage = require('./../src/storage');

describe('CommandHandler', function() {
  beforeEach(function() {
    sinon.stub(telegram, 'sendMessage').callsArgWith(2, null, "Ok");
    sinon.stub(storage, 'storeValue').callsArgWith(3, null, null);
  });

  afterEach(function() {
    telegram.sendMessage.restore();
    storage.storeValue.restore();
  });

  it('handleCommand() should send a telegram message if command is not regocnized', function(done) {
    var message = { chat: {id: 0} };
    var command = { command: "/not-a-real-command"}
    var config = {};

    commandHandler.handleCommand( message, command, config,
      function (error, response) {
        expect(response).to.equal("Ok");
        expect(telegram.sendMessage.calledOnce).to.be.true;
        done();
      }
    );
  });

  it('handleCommand() should store value for /store command', function(done) {
    var message = { chat: {id: 0} };
    var command = { command: "/store", args: ["key", "value"]}
    var config = {};

    commandHandler.handleCommand( message, command, config,
      function (error, response) {
        expect(response).to.equal("Ok");
        expect(storage.storeValue.calledOnce).to.be.true;
        expect(telegram.sendMessage.calledOnce).to.be.true;
        done();
      }
    );
  });

});
