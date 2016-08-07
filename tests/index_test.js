var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect; // we are using the "expect" style of Chai
var index = require('./../src/index');
var messageHandler = require('./../src/message_handler');
var commandHandler = require('./../src/command_handler');
var util = require('./../src/util');

describe('Index', function() {
  beforeEach(function() {
    sinon.stub(messageHandler, 'handleMessage').callsArgWith(2, null, "Ok");
    sinon.stub(commandHandler, 'handleCommand', (message, command, config, callback) => {
      setTimeout(function() {
        callback(null, "Ok");
      }, 0);
    });
    sinon.stub(util, 'parseCommand').callsArg(1);
    util.parseCommand.withArgs({ text: "/foo bar" }).callsArgWith(1, null, {command: "/foo", args: ["bar"]});
  });

  afterEach(function() {
    messageHandler.handleMessage.restore();
    commandHandler.handleCommand.restore();
    util.parseCommand.restore();
  });

  it('handleMessage() should be called in case of message update', function(done) {
    var message = { text: "Hello" };
    var config = {};

    index.handler(
      {
        config: config,
        update: { message: message }
      },
      null,
      function (error, response) {
        expect(response).to.equal("Ok");
        expect(messageHandler.handleMessage.calledOnce).to.be.true;
        expect(messageHandler.handleMessage.getCall(0).args[0]).to.equal(message);
        expect(messageHandler.handleMessage.getCall(0).args[1]).to.equal(config);
        done();
      }
    );
  });

  it('handleCommand() should be called in case of command', function(done) {
    var message = { text: "/foo bar" };
    var config = {};

    index.handler(
      {
        config: config,
        update: { message: message }
      },
      null,
      function (error, response) {
        expect(response).to.equal("Ok");
        expect(commandHandler.handleCommand.calledOnce).to.be.true;
        expect(commandHandler.handleCommand.getCall(0).args[0]).to.equal(message);
        expect(commandHandler.handleCommand.getCall(0).args[2]).to.equal(config);
        done();
      }
    );
  });
});
