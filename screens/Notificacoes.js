import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { cores } from '../theme';
import { useNotificacoes } from '../NotificacoesContext';

const tipos = {
  compra: { icone: '🛍️', nome: 'Compra' },
  agendamento: { icone: '📅', nome: 'Agendamento' },
  geral: { icone: '🔔', nome: 'Aviso' },
};

export default function Notificacoes() {
  const { lista, limpar } = useNotificacoes();

  return (
    <View style={s.tela}>
      <View style={s.topo}>
        <Text style={s.titulo}>Notificações</Text>
        {lista.length > 0 && (
          <TouchableOpacity onPress={limpar}>
            <Text style={s.limpar}>Limpar</Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={lista}
        keyExtractor={(n) => n.id}
        contentContainerStyle={{ paddingBottom: 40 }}
        ListEmptyComponent={<Text style={s.vazio}>Você ainda não recebeu notificações.</Text>}
        renderItem={({ item }) => {
          const t = tipos[item.tipo] || tipos.geral;
          return (
            <View style={s.item}>
              <Text style={s.icone}>{t.icone}</Text>
              <View style={{ flex: 1 }}>
                <Text style={s.itemTitulo}>{item.titulo}</Text>
                <Text style={s.corpo}>{item.corpo}</Text>
                <Text style={s.data}>
                  {t.nome} • {new Date(item.data).toLocaleString('pt-BR')}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const s = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo, padding: 30 },
  topo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  titulo: { fontSize: 22, color: cores.texto },
  limpar: { color: cores.laranja, fontSize: 16 },
  vazio: { color: '#888', marginTop: 20 },
  item: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 8, padding: 14, marginBottom: 12 },
  icone: { fontSize: 26, marginRight: 12 },
  itemTitulo: { fontWeight: 'bold', fontSize: 15, color: cores.texto },
  corpo: { marginTop: 2, color: '#333' },
  data: { marginTop: 6, fontSize: 12, color: '#888' },
});
