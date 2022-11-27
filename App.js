import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import CrearCuenta from './src/views/CrearCuenta';
import Login from './src/views/Login';
import Espacios from './src/views/Espacios';
import RecuperarPassword from './src/views/RecuperarPassword';
import Splash from './src/views/Splash';
import Dashboard from './src/views/Dashboard';
import Espacio from './src/views/Espacio';
import PerfilUsuario from './src/views/PerfilUsuario';
import EditarPerfil from './src/views/EditarPerfil';

import {AuthProvider} from './src/context/AuthContext';
import {AlertaProvider} from './src/context/AlertaContext';

import {Provider, DefaultTheme} from 'react-native-paper';
import {EspacioProvider} from './src/context/EspacioContext';

const Stack = createStackNavigator();

const App = () => {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      text: '#fff',
      primary: '#990000',
      secondary: '#F77E21',
      gray: '#6b7280',
      green: '#16A34A',
      background: '#111827',
      bgBottomBar: '#1f2937',
    },
  };
  return (
    <NavigationContainer>
      <Provider>
        <AlertaProvider>
          <EspacioProvider>
            <AuthProvider>
              <Stack.Navigator initialRouteName="SplashScreen">
                <Stack.Screen
                  name="SplashScreen"
                  component={Splash}
                  options={{
                    title: 'Splash Screen',
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="Dashboard"
                  component={Dashboard}
                  options={{
                    title: 'Dashboard',
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="Espacios"
                  component={Espacios}
                  options={{
                    title: 'Espacios',
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="Espacio"
                  component={Espacio}
                  options={{
                    title: 'Espacio',
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="EditarPerfil"
                  component={EditarPerfil}
                  options={{
                    title: 'Splash Screen',
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="PerfilUsuario"
                  component={PerfilUsuario}
                  options={{
                    title: 'Splash Screen',
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="Login"
                  component={Login}
                  options={{
                    title: 'Iniciar Sesion',
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="CrearCuenta"
                  component={CrearCuenta}
                  options={{
                    title: 'Crear Cuenta',
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="RecuperarPassword"
                  component={RecuperarPassword}
                  options={{
                    title: 'Recuperar Contraseña',
                    headerShown: false,
                  }}
                />
              </Stack.Navigator>
            </AuthProvider>
          </EspacioProvider>
        </AlertaProvider>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
