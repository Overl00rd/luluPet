import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Botao } from '../components/UI';
import { cores } from '../theme';
import logoEmpresa from '../assets/luluPet-removebg-preview.png';

export default function Bemvindo({ navigation }) {
  return (
    <View style={s.tela}>
      <View style={s.logo}>
        <Image source={logoEmpresa} style={s.logoImagem} />
      </View>
      <Text style={s.titulo}>Seja bem vindo ao luluPet!</Text>
      <Botao titulo="Criar uma nova conta" onPress={() => navigation.navigate('Cadastro')} />
      <Botao titulo="Já tenho uma conta" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

const s = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo, padding: 30 },
  logo: { alignItems: 'center', marginBottom: 0 },
  logoImagem: { width: 400, height: 400, marginBottom: 5 },
  titulo: { fontSize: 20, marginBottom: 24, color: cores.texto },
});
