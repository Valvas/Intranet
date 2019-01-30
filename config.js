'use strict'

const fs = require('fs');

/****************************************************************************************************/

function retrieveConfig(callback)
{
  dbms({}, (error, result) =>
  {
    return callback(error, result);
  });
}

/****************************************************************************************************/

function dbms(currentConfiguration, callback)
{
  fs.readFile('./config/dbms.json', (error, data) =>
  {
    if(error) return callback(new Error('could not read dbms configuration file at "./config/dbms.json"'));

    currentConfiguration.dbms = JSON.parse(data);

    return miscellaneous(currentConfiguration, callback);
  });
}

/****************************************************************************************************/

function miscellaneous(currentConfiguration, callback)
{
  fs.readFile('./config/miscellaneous.json', (error, data) =>
  {
    if(error) return callback(new Error('could not read miscellaneous configuration file at "./config/miscellaneous.json"'));

    currentConfiguration.miscellaneous = JSON.parse(data);

    return callback(null, currentConfiguration);
  });
}

/****************************************************************************************************/

module.exports =
{
  retrieveConfig: retrieveConfig
}
