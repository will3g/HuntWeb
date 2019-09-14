// Importação necessária
const mongoose = require('mongoose'); // npm install mongoose // O mongoose lida com a base do banco de dados
const Product = mongoose.model('Product'); // Importando o model de Product

module.exports = { // Exporta as seguintes funções

    async index(req, res) { // Faz uma listagem de todos os itens dentro da nossa base de dados, usando Asyn/Await
        const { page = 1 } = req.query; // Página default = 1, se só tiver http://localhost:3001/api/products, caso tenha algo fcará assim -> http://localhost:3001/api/products?page=2
        const products = await Product.paginate({ /*Aqui colocaliramos querys, fazer um filtro*/ }, { page, limit: 10 }); // Página default = 1 / Limite de elementos por página = 10
        // O await faz com que a pr[oxima linha só execute depois de ele conseguir buscar os dados no mongoDB
        return res.json(products); // Retorna os dados via JSON. O JSON é muito utilizado em aplicações REST.
        // JSON -> Java Script Object Notation
    },

    async show(req, res) { // Detalhes
        // Exibe os dados do objeto por meio do ID
        const product = await Product.findById(req.params.id); // Aqui pegamos o ID que está lá no parametros da rota url
        return res.json(product); // Retorna um JSON para ser visualizado
    },

    async store(req, res) { // Cria um novo objeto em nosso banco de dados
        const product = await Product.create(req.body);
        return res.json(product); // Retorna um JSON para criação
    },

    async update(req, res) { // Atualiza por meio do ID
        // Aqui estamos praticamente unindo a função store e show, para exibir e atualizar um único produto dentro do body
        // Com { new: true } estamos dizendo para retornar um novo produto para dentro da variável de instância
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.json(product);
    },

    async destroy(req, res) { // Deleta o "objeto" por meio do ID
        await Product.findByIdAndRemove(req.params.id); // Recebemos o ID do produto para deletar
        return res.send(); // O .send() vai mandar uma resposta, se for sucesso será 200
    }
};

// Product.create({
//     title: "React Native",
//     description: "React",
//     url: "http://github.com/facebook/react-native"
// });