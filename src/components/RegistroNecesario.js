import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

const RegistroNecesario = ({navigation}) => {
  const handleSingIn = () => {
    navigation.navigate('Login');
  };
  const handleSingUp = () => {
    navigation.navigate('CrearCuenta');
  };

  return (
    <View style={styles.containerRegistroNecesario}>
      <Text style={styles.textRegistroNecesario}>
        Debes iniciar sesión o registrarte para hacer esta acción.
      </Text>
      <View style={styles.containerBotonesRegistroNecesario}>
        <Button mode="contained" style={styles.button} onPress={handleSingIn}>
          Iniciar Sesión
        </Button>
        <Button mode="contained" style={styles.button} onPress={handleSingUp}>
          Registro
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerRegistroNecesario: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#181318',
    padding: 20,
  },
  textRegistroNecesario: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 10,
    backgroundColor: 'red',
    fontWeight: 'bold',
    width: '50%',
    marginHorizontal: 5,
  },
  containerBotonesRegistroNecesario: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
});

export default RegistroNecesario;
