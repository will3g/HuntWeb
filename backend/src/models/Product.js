//Importação necessária
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

// Fazendo o schema para o mongoDB, o que cada produto tem que ter.
const ProductSchema = new mongoose.Schema({
    // Cada produto tem um...
    title: { // Título
        type: String, //Tipo string
        require: true, //Obrigatório
    },
    description: { // Descrição
        type: String, //Tipo string
        require: true, //Obrigatório
    },
    url: { // URL
        type: String, //Tipo string
        require: true, //Obrigatório
    },
    createdAt: { // Data de publicação
        type: Date, // Tipo data
        default: Date.now, // Pega a data atual
        // Se preenche automaticamente
    }
});

ProductSchema.plugin(mongoosePaginate);

// Reponsável para registrar um model na aplicação
mongoose.model('Product', ProductSchema); // Esse model tem os atributos title, description, url, createdAt