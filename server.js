const express = require('express');
const path = require('path');
const app = express();
const PORTA = 3000;
let itens = [];
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/itens', (req, res) => {
  res.json(itens);
});

app.post('/itens', (req, res) => {
  const {id, nome} = req.body;
  if(!id || !nome){
    return res.status(400).json({mensagem: 'ID e nome obrigatorio'});
  }
  const novoItem = {id, nome};
  itens.push(novoItem);
  console.log('Novo item recebido:', novoItem);
  res.status(201).json({
    mensagem: 'Item criado com sucesso!',
    item: novoItem
  });
});

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});