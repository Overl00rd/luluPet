import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, TouchableOpacity, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { cores } from './theme';
import { NotificacoesProvider } from './NotificacoesContext';


import Bemvindo from './screens/Bemvindo';
import Cadastro from './screens/Cadastro';
import Login from './screens/Login';
import Home from './screens/Home';
import Produtos from './screens/Produtos';
import Agendar from './screens/Agendar';
import Notificacoes from './screens/Notificacoes';
import Perfil from './screens/Perfil';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const opcoesCabecalho = { headerTitleAlign: 'center', headerTintColor: '#000', headerTitleStyle: { fontSize: 15 } };

function Hamburguer({ navigation }) {
  return (
    <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={{ paddingRight: 16 }}>
      <Text style={{ fontSize: 26 }}>☰</Text>
    </TouchableOpacity>
  );
}

function PilhaHome() {
  return (
    <Stack.Navigator screenOptions={opcoesCabecalho}>
      <Stack.Screen
        name="HomeInicio"
        component={Home}
        options={({ navigation }) => ({ title: 'Home', headerLeft: () => <Hamburguer navigation={navigation} /> })}
      />
      <Stack.Screen name="Produtos" component={Produtos} options={{ title: 'Produtos' }} />
      <Stack.Screen
        name="Agendar"
        component={Agendar}
        options={({ route }) => ({
          title: { consulta: 'Consulta', tosa: 'Tosa', banho: 'Banho' }[route.params?.tipo] || 'Agendar',
        })}
      />
    </Stack.Navigator>
  );
}

function MenuPrincipal() {
  return (
    <Drawer.Navigator
      screenOptions={{
        ...opcoesCabecalho,
        drawerActiveTintColor: cores.laranja,
        drawerActiveBackgroundColor: '#FFE9DA',
        drawerLabelStyle: { fontWeight: 'bold' },
      }}
    >
      <Drawer.Screen name="Home" component={PilhaHome} options={{ headerShown: false, drawerLabel: ' Home' }} />
      <Drawer.Screen name="Notificações" component={Notificacoes} options={{ drawerLabel: ' Notificações' }} />
      <Drawer.Screen name="Perfil" component={Perfil} options={{ drawerLabel: ' Perfil' }} />
    </Drawer.Navigator>
  );
}

function PilhaAutenticacao() {
  return (
    <Stack.Navigator screenOptions={opcoesCabecalho}>
      <Stack.Screen name="Bemvindo" component={Bemvindo} options={{ title: 'luluPet' }} />
      <Stack.Screen name="Cadastro" component={Cadastro} options={{ title: 'Cadastro' }} />
      <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUsuario(u);
      setPronto(true);
    });
  }, []);

  if (!pronto) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: cores.fundo }}>
        <ActivityIndicator size="large" color={cores.laranja} />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NotificacoesProvider usuario={usuario}>
        <NavigationContainer>{usuario ? <MenuPrincipal /> : <PilhaAutenticacao />}</NavigationContainer>
        <StatusBar style="dark" />
      </NotificacoesProvider>
    </GestureHandlerRootView>
  );
}
