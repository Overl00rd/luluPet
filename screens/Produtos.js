import React from 'react';
import { Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert, View } from 'react-native';
import { cores } from '../theme';
import { produtos, formatarPreco } from '../imagens';
import { useNotificacoes } from '../NotificacoesContext';

export default function Produtos() {
  const { notificar } = useNotificacoes();

  async function comprar(p) {
    const preco = formatarPreco(p.preco);
    Alert.alert('Obrigado!', `Você comprou: ${p.nome}, ${preco}`);
    await notificar('Compra realizada 🛍️', `${p.nome} - ${preco}. Obrigado por comprar no luluPet!`, 'compra');
  }

  return (
    <ScrollView style={s.tela} contentContainerStyle={s.conteudo}>
      <Text style={s.titulo}>Conheça nossos produtos</Text>
      {produtos.map((p) => (
        <TouchableOpacity key={p.id} style={s.card} onPress={() => comprar(p)}>
          <Image source={p.imagem} style={s.imagem} />
          <View style={s.legenda}>
            <Text style={s.nome}>{p.nome}</Text>
            <Text style={s.nome}>{formatarPreco(p.preco)}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  conteudo: { padding: 30, paddingBottom: 50 },
  titulo: { fontSize: 22, marginBottom: 20, color: cores.texto },
  card: { marginBottom: 20 },
  imagem: { width: '100%', height: 150 },
  legenda: { backgroundColor: cores.laranja, paddingVertical: 8, alignItems: 'center' },
  nome: { color: '#fff', fontWeight: 'bold' },
});
