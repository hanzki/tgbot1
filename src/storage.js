'use strict';

var AWS = require('aws-sdk');

var dynamodb = new AWS.DynamoDB();

module.exports.getValue = (table, id, callback) => {
  var params = {
    Key: {
      Id: {
        S: id
      }
    },
    TableName: table
  };
  dynamodb.getItem(params, callback);
};

module.exports.storeValue = (table, key, value, callback) => {

  var params = {
    Key: {
      Id: {
        S: key
      },
      Value: {
        S: value
      }
    },
    TableName: table,
    ReturnValues: "ALL_NEW"
  };

  dynamodb.updateItem(params, callback);

};
