// Importação necessária
const express = require('express'); // npm install express
const mongoose = require('mongoose'); // npm install mongoose // O mongoose lida com a base do banco de dados
const requireDir = require('require-dir'); // npm install require-dir -> serve para não ficar fazendo vários requires
const cors = require('cors'); //

// Iniciando aplicação
const app = express();
app.use(express.json()); // Aqui estamos dizendo, é para permitir que envie dados para a aplicação em formato JSON
app.use(cors());

// Iniciando o DB
mongoose.connect('mongodb://localhost:27017/nodeapi', { useNewUrlParser: true });

// Com isso já temos models registrado no sistema
requireDir('./src/models');

// Rotas
// Essa rota dependede que seja localhost:3001/api para ser acessada com sucesso
app.use('/api', require('./src/routes')); // Vamos mandar a requisição para o ./src/routes
// .use -> Recebe todo tipo de requisição da rota localhost:3001/api

// Está escuntando na porta 3001
app.listen(3001);

// Rota fake teste
// const Product = mongoose.model('Product');
// app.get("/", (req, res) => {
//     Product.create({
//         title: 'React',
//         description: 'Aplicação facilitada :D',
//         url: 'http://blablabla.com/blabla/blabla'
//     });

//     return res.send("Hello World!");
// });