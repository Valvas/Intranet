'use strict'

const jwt = require('jsonwebtoken');

/****************************************************************************************************/

function checkIfTokenIsValid(token, tokenSecretKey, callback)
{
  jwt.verify(token, tokenSecretKey, (error, decodedToken) =>
  {
    if(error) return callback(error);

    return callback(null, decodedToken);
  });
}

/****************************************************************************************************/

module.exports =
{
  checkIfTokenIsValid: checkIfTokenIsValid
}
