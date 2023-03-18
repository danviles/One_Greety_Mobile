import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useEspacio from '../hooks/useEspacio';
import {useNavigation} from '@react-navigation/native';

const PreviewEspacioPerfil = ({espacio}) => {
  const {obtenerEspacio} = useEspacio();
  const navigation = useNavigation();

  const handleEspacio = () => {
    obtenerEspacio(espacio._id);
    navigation.navigate('Espacio');
  };
  return (
    <>
      {espacio && (
        <TouchableOpacity onPress={handleEspacio}>
          <View style={styles.contenedorEspCorto}>
            <Text style={styles.textoNombreEspacio}>{espacio.esp_nombre}</Text>
            <View style={styles.contenedorInfoEspacio}>
              <Text style={styles.textoAdminEspacio}>
                {espacio ? espacio.esp_administrador.usu_nombre : ''}
              </Text>
              <View style={styles.contenedorSeguidores}>
                <Text style={styles.numSeguidores}>
                  {espacio.esp_seguidores.length && espacio.esp_seguidores.length}
                </Text>
                <MaterialCommunityIcons
                  name="heart-outline"
                  color={'red'}
                  size={20}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  contenedorEspCorto: {
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  textoNombreEspacio: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  contenedorInfoEspacio: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contenedorSeguidores: {
    display: 'flex',
    flexDirection: 'row',
  },
  textoAdminEspacio: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  numSeguidores: {
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 5,
  },
});

export default PreviewEspacioPerfil;
