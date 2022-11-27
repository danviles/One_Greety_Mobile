import React, {useState} from 'react';
import Logo from '../components/LogoComponent';
import useAuth from '../hooks/useAuth';
import Alerta from '../components/AlertaComponent';

import {
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
  ToastAndroid,
} from 'react-native';
import {
  Text,
  Button,
  Dialog,
  Portal,
  ActivityIndicator,
} from 'react-native-paper';

const CrearCuenta = ({navigation}) => {
  const {crearCuenta, cargando} = useAuth();

  const [usu_nombre, setNombre] = useState('');
  const [usu_email, setEmail] = useState('');
  const [usu_password, setPassword] = useState('');
  const [rpassword, setRPassword] = useState('');

  const handleSubmit = async () => {
    if ([usu_nombre, usu_email, usu_password, rpassword].includes('')) {
      ToastAndroid.show(
        'Todos los campos son obligatorios',
        ToastAndroid.SHORT,
      );
      return;
    }

    if (usu_password !== rpassword) {
      ToastAndroid.show('Las contraseñas no coinciden', ToastAndroid.SHORT);
      return;
    }

    if (usu_password.length < 6) {
      ToastAndroid.show(
        'La contraseña debe tener al menos 6 caracteres',
        ToastAndroid.SHORT,
      );
    }

    await crearCuenta({usu_nombre, usu_email, usu_password});
  };

  return (
    <>
      <View style={styles.container}>
        <Logo />
        <View style={styles.formInput}>
          <Text>Nombre</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="gray"
            value={usu_nombre}
            onChangeText={text => setNombre(text)}
            keyboardType="email-address"
          />
        </View>
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
        <View style={styles.formInput}>
          <Text>Repite la contraseña</Text>
          <TextInput
            style={styles.inputPass}
            name="password"
            autoCapitalize="none"
            autoCorrect={false}
            enablesReturnKeyAutomatically
            placeholderTextColor="black"
            value={rpassword}
            onChangeText={text => setRPassword(text)}
            secureTextEntry={true}
          />
        </View>
        <Button mode="contained" style={styles.button} onPress={handleSubmit}>
          Registrarse
        </Button>
        <View style={styles.olvidePassword}>
          <Text>¿ Ya tienes una cuenta ? </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.textOlvidePassword}>Inicia sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 1}}>
        <Alerta
          title={'Registro exitoso'}
          desc={'Se ha enviado un correo para confirmar la cuenta'}
          btext={'ok'}
        />
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

export default CrearCuenta;
