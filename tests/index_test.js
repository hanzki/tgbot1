var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect; // we are using the "expect" style of Chai
var index = require('./../src/index');
var messageHandler = require('./../src/message_handler');

describe('Index', function() {
  beforeEach(function() {
    sinon.stub(messageHandler, 'handleMessage', function(message, config, callback) {
      setTimeout(function() {
        callback(null, "Ok");
      }, 0);
    });
  });

  afterEach(function() {
    messageHandler.handleMessage.restore();
  });

  it('handleMessage() should be called in case of message update', function(done) {
    var message = { text: "Hello" };
    var config = { key: "value" };

    index.handler(
      {
        config: config,
        update: { message: message }
      },
      null,
      function (error, response) {
        expect(response).to.equal("Ok");
        expect(messageHandler.handleMessage.getCall(0).args[0]).to.equal(message);
        expect(messageHandler.handleMessage.getCall(0).args[1]).to.equal(config);
        done();
      }
    );
  });
});
