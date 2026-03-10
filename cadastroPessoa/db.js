const mysql = require('mysql2');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Jjjb3509',
    database: 'crud_js'
});

mysqlConnection.connect((err) => {
    if (err) {
        return console.error('Erro ao ligar à base de dados: ' + err.message);
    }
    console.log('conectado ao banco de dados!');
});

module.exports = mysqlConnection;