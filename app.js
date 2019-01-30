'use strict'

global.__root = __dirname;

const fs                = require('fs');
const path              = require('path');
const mysql             = require('mysql');
const morgan            = require('morgan');
const express           = require('express');
const bodyParser        = require('body-parser');
const cookieParser      = require('cookie-parser');

const config            = require('./config');

const accountRoutes     = require('./routes/account');

const app = express();

module.exports = (callback) =>
{
  config.retrieveConfig((error, result) =>
  {
    if(error) return (console.error(error), process.exit(0));

    app.set('port', 3000);
    app.set('dbms', result.dbms);
    app.set('miscellaneous', result.miscellaneous);

    app.use(morgan('dev'));
    app.use(cookieParser());
    app.use(bodyParser.json({ limit: 5242880 }));
    app.use(bodyParser.urlencoded({ extended: false, limit: 5242880 }));

    /****************************************************************************************************/

    const pool = mysql.createPool(
    {
      connectionLimit   : 10,
      host              : result.dbms.host,
      user              : result.dbms.user,
      port              : result.dbms.port,
      password          : result.dbms.pass
    });

    app.set('databaseConnectionPool', pool);

    /****************************************************************************************************/

    app.use('/account', accountRoutes);

    app.use((req, res, next) =>
    {
      res.status(404).send({ message: 'not found' });
    });

    return callback(app);
  });
}
