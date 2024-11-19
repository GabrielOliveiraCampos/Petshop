const express = require('express');
const cors =  require('cors');

const porta = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.listen(porta, () => console.log(`Rodando na porta ${porta}`));

const connection = require('./db_config');
//PARTE DE CLIENTES
app.post('/usuario/cadastrar', (request, response) => {
    const { email, senha, nome, telefone, endereco } = request.body;
    const query = "INSERT INTO users (email, senha, nome, telefone, endereco) VALUES (?, ?, ?, ?, ?)";
    const params = [email, senha, nome, telefone, endereco];

    connection.query(query, params, (err, results) => { 
        if (results) {
            response.status(201).json({
                success: true,
                message: "Cadastro realizado com sucesso!",
                data: results
            });
        } else {
            response.status(400).json({
                success: false,
                message: "Erro no cadastro ",
                data: err
            });
        }
    });
});
app.get('/usuario/listar', (request, response) => {
    const query = "SELECT id, email, nome, telefone, endereco FROM users";

    connection.query(query, (err, results) => {
        if (err) {
            response.status(400).json({
                success: false,
                message: "Erro na listagem",
                data: err
            });
        } else {
            response.status(200).json({
                success: true,
                message: "usuarios listados com sucesso",
                data: results
            });
        }
    });
});
app.put('/usuario/editar/:id', (request, response) => {
    const id = parseInt(request.params.id);
    const { email, nome, telefone, endereco } = request.body;

    const query = "UPDATE users SET email = ?, nome = ?, telefone = ?, endereco = ? WHERE id = ?";
    const params = [email, nome, telefone, endereco, id];

    connection.query(query, params, (err, results) => {
        if (err) {
            response.status(400).json({
                success: false,
                message: "Erro ao editar usuario",
                data: err
            });
        } else {
            response.status(200).json({
                success: true,
                message: "usuario atualizado com sucesso!",
                data: results
            });
        }
    });
});
app.delete('/usuario/deletar/:id', (request, response) => {
    const id = parseInt(request.params.id);

    const query = "DELETE FROM users WHERE id = ?";
    connection.query(query, [id], (err, results) => {
        if (err) {
            response.status(400).json({
                success: false,
                message: "Erro ao deletar usuario",
                data: err
            });
        } else {
            response.status(200).json({
                success: true,
                message: "usuario deletado com sucesso!",
                data: results
            });
        }
    });
});

app.post('/usuario/login', (request, response) => {
    const { email, senha } = request.body;

    const query = "SELECT * FROM users WHERE email = ? AND senha = ?";
    const params = [email, senha];

    connection.query(query, params, (err, results) => {
        if (err) {
            return response.status(500).json({
                success: false,
                message: "Erro",
                data: err
            });
        }

        if (results.length > 0) {
            return response.status(200).json({
                success: true,
                message: "Login com sucesso",
                data: results[0] 
            });
        } else {
            return response.status(401).json({
                success: false,
                message: "Algo deu errado"
            });
        }
    });
});
//PARTE DE ANIMAIS
app.post('/animal/cadastrar', (request, response) => {
    const { nome, idade, tipo, dono_id } = request.body;

    const query = "INSERT INTO animais (nome, idade, tipo, dono_id) VALUES (?, ?, ?, ?)";
    const params = [nome, idade, tipo, dono_id];

    connection.query(query, params, (err, results) => {
        if (err) {
            response.status(400).json({
                success: false,
                message: "Erro no cadastro",
                data: err
            });
        } else {
            response.status(201).json({
                success: true,
                message: "Animal cadastrado com sucesso!",
                data: results
            });
        }
    });
});
app.get('/animal/listar', (request, response) => {
    const query = "SELECT animais.*, users.nome AS dono FROM animais JOIN users ON animais.dono_id = users.id";

    connection.query(query, (err, results) => {
        if (err) {
            response.status(400).json({
                success: false,
                message: "Erro na listagem",
                data: err
            });
        } else {
            response.status(200).json({
                success: true,
                message: "Animais listados com sucesso",
                data: results
            });
        }
    });
});
app.put('/animal/editar/:id', (request, response) => {
    const id = parseInt(request.params.id);
    const { nome, idade, tipo, dono_id } = request.body;

    const query = "UPDATE animais SET nome = ?, idade = ?, tipo = ?, dono_id = ? WHERE id = ?";
    const params = [nome, idade, tipo, dono_id, id];

    connection.query(query, params, (err, results) => {
        if (err) {
            response.status(400).json({
                success: false,
                message: "Erro ao editar animal",
                data: err
            });
        } else {
            response.status(200).json({
                success: true,
                message: "Animal atualizado com sucesso!",
                data: results
            });
        }
    });
});
app.delete('/animal/deletar/:id', (request, response) => {
    const id = parseInt(request.params.id);

    const query = "DELETE FROM animais WHERE id = ?";
    connection.query(query, [id], (err, results) => {
        if (err) {
            response.status(400).json({
                success: false,
                message: "Erro ao deletar animal",
                data: err
            });
        } else {
            response.status(200).json({
                success: true,
                message: "Animal deletado com sucesso!",
                data: results
            });
        }
    });
});








