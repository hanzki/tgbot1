var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var _ = require('highland');
var util = require('./../src/util.js');

describe('Util', function() {
  it('parseCommand(message) should return first command in message and its arguments', function(done) {

    var messages = [];
    var validators = [];

    messages.push({
      "text": "/fizz foo bar",
      "entities": [
        {
          "type": "bot_command",
          "offset": 0,
          "length": 5
        }
      ]
    });

    validators.push((result) => {
      expect(result.command).to.equal('/fizz');
      expect(result.args).to.eql(['foo', 'bar']);
    });

    messages.push({
      "text": "/fizz /buzz banana",
      "entities": [
        {
          "type": "bot_command",
          "offset": 0,
          "length": 5
        },
        {
          "type": "bot_command",
          "offset": 6,
          "length": 5
        }
      ]
    });

    validators.push((result) => {
      expect(result.command).to.equal('/fizz');
      expect(result.args).to.eql(['/buzz', 'banana']);
    });

    messages.push({
      "text": "/foo foo@bar.com",
      "entities": [
        {
          "type": "bot_command",
          "offset": 0,
          "length": 4
        },
        {
          "type": "email",
          "offset": 5,
          "length": 11
        }
      ]
    });

    validators.push((result) => {
      expect(result.command).to.equal('/foo');
      expect(result.args).to.eql(['foo@bar.com']);
    });

    _(messages)
    .flatMap(_.wrapCallback(util.parseCommand))
    .zip(validators)
    .each( (e) => {
      var result = e[0];
      var validator = e[1];
      validator(result);
    }).done(done);

  });

  it('parseCommand(message) should return undefined if no command is found at start of the message', function(done) {

    var messages = [];
    var validators = [];

    messages.push({
      "text": "Hello World!"
    });

    validators.push((result) => {
      expect(result).to.be.undefined;
    });

    messages.push({
      "text": "foo foo@bar.com",
      "entities": [
        {
          "type": "email",
          "offset": 4,
          "length": 11
        }
      ]
    });

    validators.push((result) => {
      expect(result).to.be.undefined;
    });

    messages.push({
      "text": "banana /foo",
      "entities": [
        {
          "type": "bot_command",
          "offset": 7,
          "length": 4
        }
      ]
    });

    validators.push((result) => {
      expect(result).to.be.undefined;
    });

    messages.push(undefined);

    validators.push((result) => {
      expect(result).to.be.undefined;
    });

    _(messages)
    .flatMap(_.wrapCallback(util.parseCommand))
    .zip(validators)
    .each( (e) => {
      var result = e[0];
      var validator = e[1];
      validator(result);
    }).done(done);

  });
});
