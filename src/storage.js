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
  console.log("Calling getItem with:", params);
  dynamodb.getItem(params, (e, d) => {console.log("GetItem response:", e, d); callback(e, d);});
};

module.exports.storeValue = (table, key, value, callback) => {

  var params = {
    Item: {
      Id: {
        S: key
      },
      Value: {
        S: value
      }
    },
    TableName: table
  };
  console.log("Calling putItem with:", params);
  dynamodb.putItem(params, (e, d) => {console.log("PutItem response:", e, d); callback(e, d);});

};
