export const imagens = {
  produtos: require('./assets/produtos.jpg'),
  consulta: require('./assets/consulta.jpg'),
  tosa: require('./assets/tosa.jpg'),
  banho: require('./assets/banho.jpg'),
};

export const produtos = [
  {
    id: '1',
    nome: 'Vasilha metálica para pet',
    preco: 19.99,
    imagem: require('./assets/vasilha.jpg'),
  },
  {
    id: '2',
    nome: 'Ração Dog Food 2Kg',
    preco: 19.99,
    imagem: require('./assets/racao.jpg'),
  },
  {
    id: '3',
    nome: 'Bolinha com apito',
    preco: 9.99,
    imagem: require('./assets/bolinha.jpg'),
  },
  {
    id: '4',
    nome: 'Escova para pelos',
    preco: 24.9,
    imagem: require('./assets/escova.jpg'),
  },
];

export const formatarPreco = (v) =>
  'R$ ' + v.toFixed(2).replace('.', ',');