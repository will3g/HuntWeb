const express = require('express');
const routes = express.Router();

const ProductController = require('./controllers/ProductController'); // Aqui estamos criando uma instância de ProductController

// Primeira rota
routes.get('/products', ProductController.index); // Acessa a função index de ProductController
// O :id serve de entrada do ID do product
routes.get('/products/:id', ProductController.show); // Acessa a função show de ProductController
routes.post('/products', ProductController.store); // Acessa a função store de ProductController 
// -- ATENÇÃO -- Sempre utlizamos o método POST para criação de alguma coisa em nosso servidor
routes.put('/products/:id', ProductController.update); // Acessa a função update de ProductController
routes.delete('/products/:id', ProductController.destroy); // Acessa a função destroy de ProductController

// routes.get('/products', (req, res) => {
//     return res.send("Hello World!");
// });

module.exports = routes;