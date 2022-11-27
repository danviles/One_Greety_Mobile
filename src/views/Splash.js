/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Logo from '../components/LogoComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAuth from '../hooks/useAuth';
import useEspacio from '../hooks/useEspacio';


const Splash = ({navigation}) => {

  const { auth, obtenerPerfil } = useAuth();
  const { obtenerEspacios } = useEspacio();


  useEffect(() => {
    const autenticarUsuario = async () => {
      await obtenerPerfil();
      await obtenerEspacios();
      await 
      setTimeout(() => {
        navigation.replace('Dashboard');
      } , 2000);
    };
    autenticarUsuario();
  }, []);

  return (
    <View style={styles.container}>
      <Logo />
      <ActivityIndicator animating={true} color={'#be2e4a'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#181318',
  },
});

export default Splash;
