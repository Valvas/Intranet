'use strict'

/****************************************************************************************************/

function createDatabases(databasesToCreate, databaseConnection, callback)
{
  if((databasesToCreate instanceof Object) == false) return callback(new Error('var provided is not an instance of Object'));

  if(Object.keys(databasesToCreate).length === 0) return callback(null, console.log('no databases to create'));

  var index = 0;

  var browseDatabases = () =>
  {
    databaseConnection.query(`CREATE DATABASE IF NOT EXISTS ${Object.keys(databasesToCreate)[index]}`, (error) =>
    {
      if(error) return callback(error);

      console.log(`INFO : database "${databaseName}" created !`);

      createDatabaseTables(databasesToCreate[Object.keys(databasesToCreate)[index]], Object.keys(databasesToCreate)[index], databaseConnection, (error) =>
      {
        if(error) return callback(error);

        if(Object.keys(databasesToCreate)[index += 1] == undefined) return callback(null);

        browseDatabases();
      });
    });
  }

  browseDatabases();
}


/****************************************************************************************************/

function createDatabaseTables(tablesToCreate, databaseName, databaseConnection, callback)
{
  if((tablesToCreate instanceof Object) == false) return callback(new Error('var provided is not an instance of Object'));

  if((databaseName instanceof String) == false) return callback(new Error('var provided is not an instance of String'));

  if(Object.keys(tablesToCreate).length === 0) return callback(null, console.log('no tables to create for this database'));

  var index = 0;

  var browseTables = (currentTable) =>
  {
    if((currentTable instanceof Object) == false) return callback(new Error('var provided is not an instance of Object'));

    var fieldsArray = [];

    for(var x = 0; x < Object.keys(currentTable); x++) fieldsArray.push(`${Object.keys(currentTable)[index]} ${currentTable[Object.keys(currentTable)[index]]}`);

    connection.query(`CREATE TABLE IF NOT EXISTS ${databaseName}.${Object.keys(tablesToCreate)[index]} (${fieldsArray.join(',')})`, (error) =>
    {
      if(error) return callback(error);

      if(Object.keys(tablesToCreate)[index += 1] == undefined) return callback(null);

      browseTables(tablesToCreate[Object.keys(tablesToCreate)[index]]);
    });
  }

  browseTables(tablesToCreate[Object.keys(tablesToCreate)[index]]);
}

/****************************************************************************************************/

function dropDatabase(databaseName, databaseConnection, callback)
{
  if((databaseName instanceof String) == false) return callback(new Error('database name provided is not an instance of String'));

  databaseConnection.query(`DROP DATABASE IF EXISTS ${databaseName}`, (error) =>
  {
    return callback(error);
  });
}

/****************************************************************************************************/

function insertQuery(queryObject, databaseConnection, callback)
{
  var keys = Object.keys(queryObject.args).join();
  var values = `"${Object.values(queryObject.args).join('","')}"`;

  databaseConnection.query(`INSERT INTO ${queryObject.databaseName}.${queryObject.tableName} (${keys}) VALUES (${values})`, (error, result) =>
  {
    if(error) return callback(error);

    return callback(null, result);
  });
}

/****************************************************************************************************/

function selectQuery(queryObject, databaseConnection, callback)
{
  var sqlQuery = `SELECT ${queryObject.args.join()} FROM ${queryObject.databaseName}.${queryObject.tableName}`;

  if(Object.keys(queryObject.where).length > 0)
  {
    sqlQuery += ' WHERE ';

    if(queryObject.where.operator != undefined)
    {
      sqlQuery += `${queryObject.where.key} ${queryObject.where.operator} "${queryObject.where.value}"`;

      if(queryObject.order != undefined)
      {
        getOrder(queryObject.order, (order) =>
        {
          sqlQuery += order;

          databaseConnection.query(sqlQuery, (error, result) =>
          {
            if(error) return callback(error.message);

            return callback(null, result);
          });
        });
      }

      else
      {
        databaseConnection.query(sqlQuery, (error, result) =>
        {
          if(error) return callback(error.message);

          return callback(null, result);
        });
      }
    }

    else
    {
      getCondition(queryObject.where, (result) =>
      {
        sqlQuery += result;

        if(queryObject.order != undefined)
        {
          getOrder(queryObject.order, (order) =>
          {
            sqlQuery += order;

            databaseConnection.query(sqlQuery, (error, result) =>
            {
              if(error) return callback(error.message);

              return callback(null, result);
            });
          });
        }

        else
        {
          databaseConnection.query(sqlQuery, (error, result) =>
          {
            if(error) return callback(error.message);

            return callback(null, result);
          });
        }
      });
    }
  }

  else
  {
    if(queryObject.order != undefined)
    {
      getOrder(queryObject.order, (order) =>
      {
        sqlQuery += order;

        databaseConnection.query(sqlQuery, (error, result) =>
        {
          if(error) return callback(error.message);

          return callback(null, result);
        });
      });
    }

    else
    {
      databaseConnection.query(sqlQuery, (error, result) =>
      {
        if(error) return callback(error.message);

        return callback(null, result);
      });
    }
  }
}

/****************************************************************************************************/

function updateQuery(queryObject, databaseConnection, callback)
{
  var sqlQuery = `UPDATE ${queryObject.databaseName}.${queryObject.tableName} SET `;

  var array = [];

  for(var argument in queryObject.args)
  {
    array.push(`${argument} = "${queryObject.args[argument]}"`);
  }

  sqlQuery += array.join(',');

  if(Object.keys(queryObject.where).length > 0)
  {
    sqlQuery += ' WHERE ';

    if(queryObject.where.operator != undefined)
    {
      sqlQuery += `${queryObject.where.key} ${queryObject.where.operator} "${queryObject.where.value}"`;

      databaseConnection.query(sqlQuery, (error, result) =>
      {
        if(error) return callback(error.message);

        return callback(null, result);
      });
    }

    else
    {
      getCondition(queryObject.where, (result) =>
      {
        sqlQuery += result;

        databaseConnection.query(sqlQuery, (error, result) =>
        {
          if(error) return callback(error.message);

          return callback(null, result);
        });
      });
    }
  }

  else
  {
    databaseConnection.query(sqlQuery, (error, result) =>
    {
      if(error) return callback(error.message);

      return callback(null, result);
    });
  }
}

/****************************************************************************************************/

function deleteQuery(queryObject, databaseConnection, callback)
{
  var sqlQuery = `DELETE FROM ${queryObject.databaseName}.${queryObject.tableName}`;

  if(Object.keys(queryObject.where).length > 0)
  {
    sqlQuery += ' WHERE ';

    if(queryObject.where.operator != undefined)
    {
      sqlQuery += `${queryObject.where.key} ${queryObject.where.operator} "${queryObject.where.value}"`;

      databaseConnection.query(sqlQuery, (error, result) =>
      {
        if(error) return callback(error.message);

        return callback(null, result);
      });
    }

    else
    {
      getCondition(queryObject.where, (result) =>
      {
        sqlQuery += result;

        databaseConnection.query(sqlQuery, (error, result) =>
        {
          if(error) return callback(error.message);

          return callback(null, result);
        });
      });
    }
  }

  else
  {
    databaseConnection.query(sqlQuery, (error, result) =>
    {
      if(error) return callback(error.message);

      return callback(null, result);
    });
  }
}

/****************************************************************************************************/

module.exports =
{
  insertQuery: insertQuery,
  selectQuery: selectQuery,
  updateQuery: updateQuery,
  deleteQuery: deleteQuery,
  dropDatabase: dropDatabase,
  createDatabases: createDatabases,
  createDatabaseTables: createDatabaseTables
}

/****************************************************************************************************/

function getCondition(object, callback)
{
  var array = [];
  var operands = [];

  operands.push(object.condition);

  var x = 0;

  var browseConditionChildren = (currentCondition) =>
  {
    if(currentCondition.condition == undefined) array.push(`${currentCondition.key} ${currentCondition.operator} "${currentCondition.value}"`);

    else
    {
      getCondition(currentCondition, (result) =>
      {
        array.push(result);
      });
    }

    if(object[x += 1] != undefined) browseConditionChildren(object[x]);

    else
    {
      var statement = `(${array.join(` ${operands[operands.length - 1]} `)})`;

      callback(statement);
    }
  }

  browseConditionChildren(object[x]);
}

/****************************************************************************************************/

function getOrder(array, callback)
{
  var result = [];

  for(var x = 0; x < array.length; x++)
  {
    array[x].asc
    ? result.push(`${array[x].column} ASC`)
    : result.push(`${array[x].column} DESC`);
  }

  return callback(` ORDER BY ${result.join()}`);
}

/****************************************************************************************************/
