const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Cliente = require('./models/cliente');

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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.post('/api/clientes', (req, res, next) => {
  // const cliente = req.body;
  const cliente = new Cliente({
    nome: req.body.nome,
    fone: req.body.fone,
    email: req.body.email
  });
  cliente.save();
  console.log(cliente);
  res.status(201).json({ mensagem: 'Cliente inserido' });
});


app.get('/api/clientes', (req, res, next) => {
  Cliente.find().then(documents => {
    res.status(200).json({
      mensagem: "Tudo OK",
      clientes: documents
    });
  })
});

app.use('/api/clientes', (req, res, next) => {
  res.status(200).json({
    mensagem: "Tudo OK",
    clientes: clientes
  });
});


module.exports = app;
