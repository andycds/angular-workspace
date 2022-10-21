const express = require('express');
const app = express();

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

app.use('/api/clientes', (req, res, next) => {
  res.status(200).json({
    mensagem: "Tudo OK",
    clientes: clientes
  });
});

module.exports = app;
