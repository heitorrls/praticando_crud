const express = require('express');
const router = express.Router(); 
const path = require('path');
const mysqlConnection = require('./db'); 

// 1. Rota para mostrar o formulário
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para listar os usuarios no html 
router.get('/usuarios', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

//  Rota para receber os dados do formulário
router.post('/cadastrar', (req, res) => {
    const {nome, sobrenome, email} = req.body;

    if (!nome || !sobrenome || !email) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const query = 'INSERT INTO usuarios (nome, sobrenome, email) VALUES (?, ?, ?)';
    
    mysqlConnection.query(query, [nome, sobrenome, email], (err) => {
        if (err) {
            console.error('Erro ao tentar criar utilizador: ' + err);
            return res.status(500).json({ error: 'Erro ao criar utilizador' });
        }
        res.redirect('/');
    });
});

// Rota que busca os dados no banco de dados e retorna em formato JSON para o frontend
router.get('/api/usuarios', (req, res) => {
    const query = 'SELECT id, nome, sobrenome, email FROM usuarios';

    mysqlConnection.query(query, (err, resultados) => {
        if (err) {
            console.error('Erro ao procurar utilizadores: ' + err);
            return res.status(500).json({ error: 'Erro na base de dados' });
        }
        res.json(resultados);
    });
});

router.delete('/api/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM usuarios WHERE id = ?';

    mysqlConnection.query(query, [id], (err, resultados) => {
        if (err) {
            console.error('Erro ao tentar excluir utilizador: ' + err);
            return res.status(500).json({ error: 'Erro ao excluir utilizador' });
        }
        res.json({ message: 'Utilizador excluído com sucesso!' });
    });
});

router.put('/api/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { nome, sobrenome, email } = req.body;
    const query = 'UPDATE usuarios SET nome = ?, sobrenome = ?, email = ? WHERE id = ?';

    mysqlConnection.query(query, [nome, sobrenome, email, id], (err, resultados) => {
        if (err) {
            console.error('Erro ao tentar atualizar utilizador: ' + err);
            return res.status(500).json({ error: 'Erro ao atualizar utilizador' });
        }
        res.json({ message: 'Utilizador atualizado com sucesso!' });
    });
});



module.exports = router;