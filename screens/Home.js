import React from 'react';
import { Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { cores } from '../theme';
import { imagens } from '../imagens';

const opcoes = [
  { titulo: 'Conheça nossos produtos', imagem: imagens.produtos, destino: ['Produtos'] },
  { titulo: 'Agendar consulta', imagem: imagens.consulta, destino: ['Agendar', { tipo: 'consulta' }] },
  { titulo: 'Agendar tosa', imagem: imagens.tosa, destino: ['Agendar', { tipo: 'tosa' }] },
  { titulo: 'Agendar banho', imagem: imagens.banho, destino: ['Agendar', { tipo: 'banho' }] },
];

export default function Home({ navigation }) {
  return (
    <ScrollView style={s.tela} contentContainerStyle={s.conteudo}>
      <Text style={s.titulo}>Bem vindo!</Text>
      {opcoes.map((o) => (
        <TouchableOpacity key={o.titulo} style={s.card} onPress={() => navigation.navigate(...o.destino)}>
          <Image source={o.imagem} style={s.imagem} />
          <Text style={s.legenda}>{o.titulo}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

export const s = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  conteudo: { padding: 30, paddingBottom: 50 },
  titulo: { fontSize: 22, marginBottom: 20, color: cores.texto },
  card: { marginBottom: 20 },
  imagem: { width: '100%', height: 150 },
  legenda: {
    backgroundColor: cores.laranja,
    color: '#fff',
    textAlign: 'center',
    paddingVertical: 8,
    fontWeight: 'bold',
  },
});
