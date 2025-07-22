const API_URL = 'http://localhost:3000/itens';

const btnCarregar = document.getElementById('carregar-btn');
const btnVoltar = document.getElementById('voltar-btn');
const listaItens = document.getElementById('lista-itens');
const form = document.getElementById('form-criar-item');
const inputId = document.getElementById('id');
const inputNome = document.getElementById('nome');


// GET: busca e exibe itens
async function carregarItens() {
  try {
    const response = await fetch(API_URL);
    const itens = await response.json();

    listaItens.innerHTML = itens.map(item =>
      `<li>ID: ${item.id} | Nome: ${item.nome}</li>`
    ).join('');
  } catch (erro) {
    console.error("Erro ao carregar itens:", erro);
  }
}

// POST: adiciona novo item
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const novoItem = {
    id: parseInt(inputId.value),
    nome: inputNome.value
  };

  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoItem)
    });

    form.reset();
    carregarItens(); // atualiza lista depois de enviar
  } catch (erro) {
    console.error("Erro ao criar item:", erro);
  }
});

// botao de carregar
btnCarregar.addEventListener('click', carregarItens);
//botao de voltar
btnVoltar.addEventListener('click', () => {
  listaItens.innerHTML = ''; 
});