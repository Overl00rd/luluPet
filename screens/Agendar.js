import React, { useState } from 'react';
import { Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Botao, Campo } from '../components/UI';
import { cores } from '../theme';
import { useNotificacoes } from '../NotificacoesContext';

const config = {
  consulta: {
    titulo: 'Agendar consulta',
    artigo: 'Sua consulta',
    rotuloData: 'Data da consulta',
    rotuloObs: 'Problema a ser resolvido',
    exemplo: 'Meus gatos estão se coçando mais que o normal...',
  },
  tosa: {
    titulo: 'Agendar tosa',
    artigo: 'Sua tosa',
    rotuloData: 'Data da tosa',
    rotuloObs: 'Estilo desejado',
    exemplo: 'Só queria que vocês baixassem o pelo do meu cachorro caramelo.',
  },
  banho: {
    titulo: 'Agendar banho',
    artigo: 'Seu banho',
    rotuloData: 'Data do banho',
    rotuloObs: 'Especificações',
    exemplo: 'Meu pet é alérgico a shampoo Baby.',
  },
};

const dataValida = (d) => {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(d);
  if (!m) return false;
  const [, dia, mes, ano] = m.map(Number);
  const dt = new Date(ano, mes - 1, dia);
  return dt.getFullYear() === ano && dt.getMonth() === mes - 1 && dt.getDate() === dia;
};
const horaValida = (h) => /^([01]\d|2[0-3]):[0-5]\d$/.test(h);

export default function Agendar({ route, navigation }) {
  const c = config[route.params?.tipo] || config.consulta;
  const { notificar } = useNotificacoes();
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [obs, setObs] = useState('');

  async function agendar() {
    if (!dataValida(data)) return Alert.alert('Atenção', 'Informe a data no formato DD/MM/AAAA.');
    if (!horaValida(hora)) return Alert.alert('Atenção', 'Informe o horário no formato HH:MM (ex.: 13:00).');
    const texto = `${c.artigo} foi ${c.artigo.startsWith('Sua') ? 'agendada' : 'agendado'} para ${data} às ${hora}`;
    Alert.alert('Obrigado!', texto);
    await notificar('Agendamento confirmado ✅', texto, 'agendamento');
    setData('');
    setHora('');
    setObs('');
    navigation.goBack();
  }

  return (
    <ScrollView style={s.tela} contentContainerStyle={s.conteudo} keyboardShouldPersistTaps="handled">
      <Text style={s.titulo}>{c.titulo}</Text>
      <Campo rotulo={c.rotuloData} placeholder="DD/MM/AAAA" value={data} onChangeText={setData} keyboardType="numbers-and-punctuation" />
      <Campo rotulo="Horário" placeholder="HH:MM" value={hora} onChangeText={setHora} keyboardType="numbers-and-punctuation" />
      <Campo rotulo={c.rotuloObs} placeholder={c.exemplo} value={obs} onChangeText={setObs} multiline />
      <Botao titulo="Agendar" onPress={agendar} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  conteudo: { padding: 30, paddingTop: 40 },
  titulo: { fontSize: 22, marginBottom: 24, color: cores.texto },
});
