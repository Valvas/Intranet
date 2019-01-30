'use strict'

const express       = require('express');
const jwt           = require('jsonwebtoken');
const tokenModule   = require(`${__root}/modules/token`);
const accountModule = require(`${__root}/modules/account`);

const router = express.Router();

/****************************************************************************************************/

router.post('/login', (req, res) =>
{
  if(req.body.user == undefined) return res.status(404).send({ message: 'Email address is missing from the body' });
  if(req.body.pass == undefined) return res.status(404).send({ message: 'Password is missing from the body' });

  if(typeof(req.body.user) !== 'string') return res.status(406).send({ message: 'Email address provided is not a string' });
  if(typeof(req.body.pass) !== 'string') return res.status(406).send({ message: 'Password provided is not a string' });

  req.app.get('databaseConnectionPool').getConnection((error, connection) =>
  {
    if(error) return res.status(500).send({ message: error.message });

    accountModule.authenticateAccount(req.body.user, req.body.pass, connection, req.app.get('dbms'), req.app.get('miscellaneous').encryptionSalt, (error, accountUuid) =>
    {
      connection.release();

      if(error) return res.status(500).send({ message: error.message });

      jwt.sign({ uuid: accountUuid }, req.app.get('miscellaneous').tokenSecretKey, (error, token) =>
      {
        if(error) return res.status(500).send({ message: error.message });

        return res.status(200).send({ token: token, maxAge: (60 * 60 * 24) });
      });
    });
  });
});

/****************************************************************************************************/

router.get('/get-data', (req, res) =>
{
  if(req.headers.authorization == undefined) return res.status(500).send({ message: 'no token provided' });

  tokenModule.checkIfTokenIsValid(req.headers.authorization, req.app.get('miscellaneous').tokenSecretKey, (error, decodedToken) =>
  {
    if(error) return res.status(500).send({ message: error.message });

    req.app.get('databaseConnectionPool').getConnection((error, connection) =>
    {
      if(error) return res.status(500).send({ message: error.message });

      accountModule.retrieveAccountData(decodedToken.uuid, connection, req.app.get('dbms'), (error, accountData) =>
      {
        connection.release();

        if(error) return res.status(500).send({ message: error.message });

        return res.status(200).send(accountData);
      });
    });
  });
});

/****************************************************************************************************/

module.exports = router;
