import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { signOut, deleteUser } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { Botao, Link } from '../components/UI';
import { cores } from '../theme';
import { erroFirebase } from '../erros';

export default function Perfil() {
  const user = auth.currentUser;

  function excluir() {
    Alert.alert('Excluir conta', 'Tem certeza? Essa ação não pode ser desfeita.', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteUser(auth.currentUser);
          } catch (e) {
            Alert.alert('Erro', erroFirebase(e));
          }
        },
      },
    ]);
  }

  return (
    <View style={s.tela}>
      <Text style={s.titulo}>{user?.displayName || 'Usuário'}</Text>
      <Text style={s.rotulo}>Email</Text>
      <View style={s.campo}>
        <Text style={s.valor}>{user?.email}</Text>
      </View>
      <View style={{ flex: 1 }} />
      <Botao
        titulo="Logout"
        onPress={() => signOut(auth)}
        estilo={{ backgroundColor: cores.logoutFundo }}
        textoEstilo={{ color: '#000', fontWeight: 'bold', fontSize: 15 }}
      />
      <Link titulo="Excluir conta" cor={cores.erro} onPress={excluir} />
    </View>
  );
}

const s = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo, padding: 30, paddingBottom: 50 },
  titulo: { fontSize: 22, marginVertical: 24, color: cores.texto },
  rotulo: { fontSize: 14, marginBottom: 6 },
  campo: { backgroundColor: '#fff', borderRadius: 8, padding: 12 },
  valor: { fontStyle: 'italic', fontSize: 15 },
});
