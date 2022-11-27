/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import Logo from '../components/LogoComponent';
import useAuth from '../hooks/useAuth';

import {
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
  Pressable,
  ToastAndroid
} from 'react-native';
import {
  Text,
  Button,
  Dialog,
  Portal,
  ActivityIndicator,
} from 'react-native-paper';

const Login = ({navigation}) => {
  const [usu_email, setEmail] = useState('');
  const [usu_password, setPassword] = useState('');
  const {hacerLogin, auth, cargando} = useAuth();

  useEffect(() => {
    if (auth._id) {
      navigation.replace('Dashboard');
    }
  } , [cargando]);

  const handleSubmit = async () => {
    if ([usu_email, usu_password].includes('')) {
      ToastAndroid.show('Todos los campos son obligatorios', ToastAndroid.SHORT);
      return;
    }

    try {
      await hacerLogin({usu_email, usu_password});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Logo />
      {/* {msg &&  <Alerta alerta={alerta} />} */}
      <View style={styles.formInput}>
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="gray"
          value={usu_email}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.formInput}>
        <Text>Contraseña</Text>
        <TextInput
          style={styles.inputPass}
          name="password"
          autoCapitalize="none"
          autoCorrect={false}
          enablesReturnKeyAutomatically
          placeholderTextColor="black"
          value={usu_password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />
      </View>
      <Button mode="contained" style={styles.button} onPress={handleSubmit}>
        Iniciar sesión
      </Button>
      <View style={{flex:1}}>
        {cargando && <ActivityIndicator animating={true} color={'#be2e4a'} />}
      </View>
      <View style={styles.olvidePassword}>
        <Text>¿ No puedes iniciar sesión ? </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('RecuperarPassword')}>
          <Text style={styles.textOlvidePassword}>Presiona aquí</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
        <View style={{flex: 1, height: 1, backgroundColor: 'gray'}} />
        <View>
          <Text style={{width: 50, textAlign: 'center', color: 'gary'}}>
            {' '}
            O{' '}
          </Text>
        </View>
        <View style={{flex: 1, height: 1, backgroundColor: 'gray'}} />
      </View>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate('CrearCuenta')}>
        Registrate
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  borderOr: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  orItems: {
    borderWidth: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formInput: {
    marginBottom: 10,
    width: '100%',
  },
  input: {
    backgroundColor: 'white',
    shadowColor: 'black',
    borderRadius: 10,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  inputPass: {
    backgroundColor: 'white',
    shadowColor: 'black',
    borderRadius: 10,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  button: {
    width: '100%',
    shadowColor: 'black',
    borderRadius: 10,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: '#075985',
  },
  olvidePassword: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 50,
    marginTop: 10,
  },
  textOlvidePassword: {
    color: '#075985',
  },
});

export default Login;
