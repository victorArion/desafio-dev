
const mysql = require('mysql');
const config = require('./config.json');

//Inicia a conexão com o banco de dados usando pool
const desafio = mysql.createPool({
    connectionLimit: config.dataBase.connectionLimit,
    host: config.dataBase.host,
    user: config.dataBase.user,
    password: config.dataBase.password,
    database: config.dataBase.database,
    timezone: config.dataBase.timezone,
    dateStrings: config.dataBase.dateStrings,
});

module.exports = {desafio};