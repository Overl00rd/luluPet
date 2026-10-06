import React, { useState } from 'react';
import { Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { Botao, Campo } from '../components/UI';
import { cores } from '../theme';
import { erroFirebase } from '../erros';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function entrar() {
    if (!email.trim() || !senha) return Alert.alert('Atenção', 'Preencha email e senha.');
    setCarregando(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), senha);
    } catch (e) {
      Alert.alert('Não foi possível entrar', erroFirebase(e));
    } finally {
      setCarregando(false);
    }
  }

  return (
    <ScrollView style={s.tela} contentContainerStyle={s.conteudo} keyboardShouldPersistTaps="handled">
      <Text style={s.titulo}>Entre em sua conta!</Text>
      <Campo
        rotulo="Email"
        placeholder="exemplo@email.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Campo rotulo="Senha" placeholder="Sua senha" value={senha} onChangeText={setSenha} secureTextEntry />
      <Botao titulo={carregando ? 'Entrando...' : 'Entrar'} onPress={entrar} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  conteudo: { padding: 30, paddingTop: 60 },
  titulo: { fontSize: 22, marginBottom: 24, color: cores.texto },
});
