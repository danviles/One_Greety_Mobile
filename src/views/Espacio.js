import React, {useState} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {Paragraph, Button, ActivityIndicator} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LeftMenu from '../components/LeftMenu';
import useEspacio from '../hooks/useEspacio';
import useAuth from '../hooks/useAuth';

const Espacio = ({navigation}) => {
  const {espacio, cargando} = useEspacio();
  const { auth } = useAuth();

  if (cargando) {
    return <ActivityIndicator animating={true} color={'#be2e4a'} style={{flex: 1}}/>;
  }

  return (
    <>
      <LeftMenu navigation={navigation} />
      <View style={styles.espacioContainer}>
        <ImageBackground
          source={{
            uri: espacio.esp_img_portada,
          }}
          resizeMode="cover"
          style={styles.image}>
          <View style={styles.biografia}>
            <View style={styles.tituloSeguidores}>
              <Text style={styles.textTitulo}>{espacio.esp_nombre}</Text>
              <View style={styles.seguidoresContainer}>
                <MaterialCommunityIcons
                  name="heart-outline"
                  color={'red'}
                  size={20}
                />
                <Text style={styles.seguidores}>
                  {espacio.esp_seguidores.length}
                </Text>
              </View>
            </View>
            <Paragraph style={styles.textDescripcion}>
              {espacio.esp_descripcion}
            </Paragraph>
            <Button
              mode="contained"
              style={styles.button}
            >
              {espacio.esp_acceso ? 'Unirte al club' : 'Pedir acceso'}
            </Button>
          </View>
        </ImageBackground>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  espacioContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  biografia: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 20,
    height: '50%',
    width: '100%',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    borderColor: 'white',
    borderWidth: 1,
  },
  textTitulo: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  textDescripcion: {
    color: 'white',
  },
  tituloSeguidores: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  seguidoresContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  seguidores: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
    marginLeft: 5,
  },
  button: {
    marginTop: 10,
    backgroundColor: 'red',
    fontWeight: 'bold',
    marginHorizontal: 50,
  },
});

export default Espacio;
