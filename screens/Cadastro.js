import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { Botao, Campo } from '../components/UI';
import { cores } from '../theme';
import { erroFirebase } from '../erros';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function criar() {
    if (!nome.trim() || !email.trim() || !senha) {
      return Alert.alert('Atenção', 'Preencha nome, email e senha.');
    }
    setCarregando(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), senha);
      await updateProfile(cred.user, { displayName: nome.trim() });
      // o onAuthStateChanged do App leva o usuário para a Home
    } catch (e) {
      Alert.alert('Não foi possível cadastrar', erroFirebase(e));
    } finally {
      setCarregando(false);
    }
  }

  return (
    <ScrollView style={s.tela} contentContainerStyle={s.conteudo} keyboardShouldPersistTaps="handled">
      <Text style={s.titulo}>Crie sua conta!</Text>
      <Campo rotulo="Nome" placeholder="Seu nome" value={nome} onChangeText={setNome} />
      <Campo
        rotulo="Email"
        placeholder="exemplo@email.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Campo
        rotulo="Senha"
        placeholder="Mínimo 6 caracteres"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <Botao titulo={carregando ? 'Criando...' : 'Criar conta'} onPress={criar} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  conteudo: { padding: 30, paddingTop: 60 },
  titulo: { fontSize: 22, marginBottom: 24, color: cores.texto },
});
