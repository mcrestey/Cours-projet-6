const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

//Se connecter à mongoDB
mongoose.connect('mongodb+srv://mcrestey:womhek-sIgwid-qanby4@cluster0.ag8xmxh.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

//Authoriser le CORS en ajoutant des entêtes headers dans les req.
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());


app.use('.api/auth', userRoutes);
app.use('/api/stuff', stuffRoutes);

module.exports = app;


