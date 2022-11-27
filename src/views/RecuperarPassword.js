import React, {useState} from 'react';
import Logo from '../components/LogoComponent';
import useAuth from '../hooks/useAuth';

import {
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
  Pressable,
  ToastAndroid,
  Keyboard
} from 'react-native';
import {
  Text,
  Button,
  Dialog,
  Portal,
  Paragraph,
  ActivityIndicator,
} from 'react-native-paper';
import Alerta from '../components/AlertaComponent';

const RecuperarPassword = ({navigation}) => {
  const [usu_email, setEmail] = useState('');
  const [usu_password, setPassword] = useState('');

  const {recuperarPassword, cargando} = useAuth();

  const handleSubmit = async () => {
    if (usu_email === '') {
      ToastAndroid.show(
        'Todos los campos son obligatorios',
        ToastAndroid.SHORT,
      );
      return;
    }
    Keyboard.dismiss();
    await recuperarPassword(usu_email);

  };

  return (
    <>
      <View style={styles.container}>
        <Logo />
        <View style={styles.formInput}>
          <Text>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="ej: onegreety@email.com"
            placeholderTextColor="gray"
            value={usu_email}
            onChangeText={text => setEmail(text)}
            keyboardType="email-address"
          />
        </View>

        <Button mode="contained" style={styles.button} onPress={handleSubmit}>
          Enviar
        </Button>
      </View>

      <View style={{flex: 1}}>
        <Alerta title={'Recuperar Contraseña'} desc={'Se ha enviado un correo para recuperar la contraseña'} btext={'ok'}/>
        {cargando && <ActivityIndicator animating={true} color={'#be2e4a'} />}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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

export default RecuperarPassword;
