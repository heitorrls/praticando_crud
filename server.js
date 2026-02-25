const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');   



const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'crud_js'
});

mysqlConnection.connect((err) => {
    if (err) {
        return console.error('erro ao conectar com o banco de dados meu parceiro' + err.message);
    }
    else {
        console.log('conectado com suceeso meu mano!!');
    }
});

app.post('/cadastrar', (req, res) => {
    const {nome, sobrenome, email} = req.body;

    if (!nome || !sobrenome || !email) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const query = 'INSERT INTO usuarios (nome, sobrenome, email) VALUES (?, ?, ?)';
    mysqlConnection.query(query, [nome, sobrenome, email], (err) => {
        if (err) {
            console.error('erro ao tentar criar o usuario' + err);
            return res.status(500).json({ error: 'Erro ao criar usuário' });
        }
        else {
            res.status(201).json({ message: 'Usuário criado com sucesso!' });
        }
    });
});


app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`);
});