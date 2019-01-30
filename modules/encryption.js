'use strict'

const bcrypt = require('bcrypt');

/****************************************************************************************************/

function encryptString(stringToEncrypt, salt, callback)
{
  bcrypt.hash(stringToEncrypt, salt, (error, result) =>
  {
    if(error) return callback(error);

    return callback(null, result);
  });
}

/****************************************************************************************************/

module.exports =
{
  encryptString: encryptString
}
