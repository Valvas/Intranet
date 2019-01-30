'use strict'

const dbms        = require(`${__root}/modules/dbms`);
const encryption  = require(`${__root}/modules/encryption`);

/****************************************************************************************************/

function authenticateAccount(accountEmail, accountPassword, databaseConnection, dbmsConfig, salt, callback)
{
  encryption.encryptString(accountPassword, salt, (error, encryptedPassword) =>
  {
    if(error) return callback(error);

    dbms.selectQuery(
    {
      databaseName: dbmsConfig.databases.intranet.label,
      tableName: dbmsConfig.databases.intranet.tables.accounts,
      args: [ 'uuid' ],
      where: { condition: 'AND', 0: { operator: '=', key: 'email', value: accountEmail }, 1: { operator: '=', key: 'password', value: encryptedPassword } }

    }, databaseConnection, (error, result) =>
    {
      if(error) return callback(error);

      if(result.length === 0) return callback(new Error('account not found'));

      return callback(null, result[0].uuid);
    });
  });
}

/****************************************************************************************************/

function retrieveAccountData(accountUuid, databaseConnection, dbmsConfig, callback)
{
  dbms.selectQuery(
  {
    databaseName: dbmsConfig.databases.intranet.label,
    tableName: dbmsConfig.databases.intranet.tables.accounts,
    args: [ 'email', 'firstname', 'lastname' ],
    where: { operator: '=', key: 'uuid', value: accountUuid }

  }, databaseConnection, (error, result) =>
  {
    if(error) return callback(error);

    if(result.length === 0) return callback(new Error('account not found'));

    const accountData =
    {
      accountEmail: result[0].email,
      accountLastname: result[0].lastname,
      accountFirstname: result[0].firstname
    }

    return callback(null, accountData);
  });
}

/****************************************************************************************************/

module.exports =
{
  authenticateAccount: authenticateAccount,
  retrieveAccountData: retrieveAccountData
}
