/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar, Button, ActivityIndicator} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import useAuth from '../hooks/useAuth';
import RegistroNecesario from '../components/RegistroNecesario';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {regiones} from '../helpers/regiones';

const Perfil = ({navigation}) => {
  const {auth, cargando, hacerLogout, obtenerPerfil, editarPerfil} = useAuth();
  const {usu_nombre, usu_perfil_img, usu_region} = auth;

  const [region, setRegion] = useState('');

  useEffect(() => {
    obtenerPerfil();
    setRegion(usu_region);
  }, []);

  const handleRegion = (itemValue, itemIndex) => {
    setRegion(itemValue);
    editarPerfil({usu_region: itemValue}, undefined);
  };

  const handleLogout = () => {
    hacerLogout();
    navigation.goBack();
  };

  if (cargando) {
    return <ActivityIndicator animating={true} color={'#be2e4a'} style={{flex: 1}}/>;
  }



  return (
    <View>
      {auth._id ? (
        <View style={styles.contenedorPerfil}>
          <View style={styles.contenedordatosPerfil}>
            <Avatar.Image size={90} source={{uri: usu_perfil_img}} />
            <View style={styles.contenedorTextoPerfil}>
              <Text style={styles.textoPerfil}>{usu_nombre}</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('PerfilUsuario', {id: auth._id})}>
                <Text style={styles.textoVerPerfil}>Ver Perfil</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.titulo}>Configuración de la cuenta</Text>
          <TouchableOpacity onPress={() => navigation.navigate('EditarPerfil')}>
            <View style={styles.contenedorBotonesPerfil}>
              <Text style={styles.textoBotonesPerfil}>Editar Perfil</Text>
              <MaterialCommunityIcons
                name="account-edit-outline"
                color={'gray'}
                size={30}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.contenedorPicker}>
            <Text style={styles.textoPicker}>Region de busqueda</Text>
            <Picker
              style={{color: 'gray'}}
              selectedValue={usu_region}
              dropdownIconColor={'black'}
              onValueChange={(itemValue, itemIndex) => handleRegion(itemValue, itemIndex)}>
              <Picker.Item label="Global" value="Global" />
              {regiones.map((region, index) => (
                <Picker.Item key={index} label={region} value={region} />
              ))}
            </Picker>
          </View>
          <Button mode="contained" style={styles.button} onPress={handleLogout}>
            Cerrar Sesion
          </Button>
        </View>
      ) : (
        <RegistroNecesario navigation={navigation} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contenedorPerfil: {
    display: 'flex',
    height: '100%',
    padding: 20,
  },
  contenedordatosPerfil: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 10,
  },
  contenedorTextoPerfil: {
    marginLeft: 15,
  },
  textoPerfil: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  textoVerPerfil: {
    fontSize: 14,
    color: '#00aaff',
    fontWeight: 'bold',
  },
  contenedorBotonesPerfil: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 2,
    borderTopColor: '#e0e0e0',
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 5,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  textoBotonesPerfil: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  contenedorPicker: {
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
  },
  textoPicker: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: 'red',
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
});

export default Perfil;
