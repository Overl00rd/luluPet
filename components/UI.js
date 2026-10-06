import React from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, View } from 'react-native';
import { cores } from '../theme';

export function Botao({ titulo, onPress, estilo, textoEstilo }) {
  return (
    <TouchableOpacity style={[s.botao, estilo]} onPress={onPress} activeOpacity={0.8}>
      <Text style={[s.botaoTexto, textoEstilo]}>{titulo}</Text>
    </TouchableOpacity>
  );
}

export function Campo({ rotulo, multiline, ...props }) {
  return (
    <View style={{ marginBottom: 18 }}>
      <Text style={s.rotulo}>{rotulo}</Text>
      <TextInput
        style={[s.campo, multiline && { height: 100, textAlignVertical: 'top' }]}
        placeholderTextColor={cores.placeholder}
        multiline={multiline}
        {...props}
      />
    </View>
  );
}

export function Link({ titulo, onPress, cor }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[s.link, cor && { color: cor }]}>{titulo}</Text>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  botao: {
    backgroundColor: cores.laranja,
    borderRadius: 6,
    paddingVertical: 18,
    alignItems: 'center',
    marginVertical: 8,
  },
  botaoTexto: { color: '#fff', fontSize: 20 },
  rotulo: { fontSize: 14, color: cores.texto, marginBottom: 6 },
  campo: {
    backgroundColor: cores.campo,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 15,
  },
  link: { color: cores.laranja, fontSize: 18, textDecorationLine: 'underline', marginTop: 10 },
});
