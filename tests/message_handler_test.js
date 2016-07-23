var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var messageHandler = require('./../src/message_handler');

describe('MessageHandler', function() {
  it('reverseString(string) should reverse input string', function() {
    var input = "Hello";
    expect(messageHandler.reverseString(input)).to.equal("olleH");
  });
});
