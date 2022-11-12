const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const clienteRoutes = require('./rotas/rotas');
//const Cliente = require('./models/cliente');

//IMPORTANTE: Troque pela sua conexão
mongoose.connect('mongodb+srv://andycds:anderson@cluster0.ieosidd.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log('Conexão Ok');
  }).catch(() => {
    console.log('Sem conexão');
  });

const clientes = [
  {
    id: '1',
    nome: 'Jose',
    fone: '11223344',
    email: 'jose@email.com'
  },
  {
    id: '2',
    nome: 'Jaqueline',
    fone: '22112211',
    email: 'jaqueline@email.com'
  }
];

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

app.use('/api/clientes/', clienteRoutes);

module.exports = app;
