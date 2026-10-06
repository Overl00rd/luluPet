import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Ctx = createContext(null);
export const useNotificacoes = () => useContext(Ctx);

export function NotificacoesProvider({ usuario, children }) {
  const [lista, setLista] = useState([]);
  const listaRef = useRef([]);
  const chave = usuario ? `notificacoes:${usuario.uid}` : null;

  const salvar = useCallback(
    (nova) => {
      listaRef.current = nova;
      setLista(nova);
      if (chave) AsyncStorage.setItem(chave, JSON.stringify(nova)).catch(() => {});
    },
    [chave]
  );

  // permissão + canal Android
  useEffect(() => {
    (async () => {
      try {
        if (Platform.OS === 'android') {
          await Notifications.setNotificationChannelAsync('default', {
            name: 'luluPet',
            importance: Notifications.AndroidImportance.MAX,
          });
        }
        const { status } = await Notifications.getPermissionsAsync();
        if (status !== 'granted') await Notifications.requestPermissionsAsync();
      } catch (e) {
        console.log('Notificações indisponíveis:', e?.message);
      }
    })();
  }, []);

  // carrega histórico do usuário logado
  useEffect(() => {
    if (!chave) {
      listaRef.current = [];
      setLista([]);
      return;
    }
    AsyncStorage.getItem(chave).then((v) => {
      const dados = v ? JSON.parse(v) : [];
      listaRef.current = dados;
      setLista(dados);
    });
  }, [chave]);

  const registrar = useCallback(
    (item) => {
      if (listaRef.current.some((n) => n.id === item.id)) return;
      salvar([item, ...listaRef.current]);
    },
    [salvar]
  );

  // notificações recebidas com o app aberto
  useEffect(() => {
    const sub = Notifications.addNotificationReceivedListener((n) => {
      const c = n.request.content;
      registrar({
        id: n.request.identifier,
        titulo: c.title || '',
        corpo: c.body || '',
        tipo: c.data?.tipo || 'geral',
        data: Date.now(),
      });
    });
    return () => sub.remove();
  }, [registrar]);

  // dispara a notificação na barra e registra na lista
  const notificar = useCallback(
    async (titulo, corpo, tipo) => {
      const id = await Notifications.scheduleNotificationAsync({
        content: { title: titulo, body: corpo, data: { tipo }, sound: true },
        trigger: null,
      });
      registrar({ id, titulo, corpo, tipo, data: Date.now() });
    },
    [registrar]
  );

  const limpar = useCallback(() => salvar([]), [salvar]);

  return <Ctx.Provider value={{ lista, notificar, limpar }}>{children}</Ctx.Provider>;
}
