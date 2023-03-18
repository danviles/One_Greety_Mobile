import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  VirtualizedList,
} from 'react-native';
import {
  Paragraph,
  Button,
  ActivityIndicator,
  transparent,
} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LeftMenu from '../components/LeftMenu';
import useEspacio from '../hooks/useEspacio';
import useAuth from '../hooks/useAuth';
import {ScrollView} from 'react-native-gesture-handler';
import ActivityComponent from '../components/ActivityComponent';

const Espacio = ({navigation}) => {
  const {espacio, cargando, agregarSeguidor, agregarPeticion} = useEspacio();
  const [esSeguidor, setEsSeguidor] = useState(false);
  const {auth} = useAuth();

  useEffect(() => {
    if (espacio && auth) {
      if (espacio.esp_seguidores.find(item => item === auth._id)) {
        setEsSeguidor(true);
      } else {
        setEsSeguidor(false);
      }
    }
  }, [espacio, auth]);

  const handleSubmit = () => {
    if (!auth._id) {
      navigation.navigate('Login');
      return;
    }
    if (espacio.esp_acceso) {
      agregarSeguidor(espacio._id);
    } else {
      agregarPeticion(espacio._id);
    }
  };

  if (cargando) {
    return (
      <ActivityIndicator animating={true} color={'#be2e4a'} style={{flex: 1}} />
    );
  }

  return (
    <>
      <LeftMenu />
      <View style={styles.espacioContainer}>
        <ImageBackground
          source={{
            uri: espacio.esp_img_portada,
          }}
          resizeMode="stretch"
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
            <ScrollView>
              <Paragraph style={styles.textDescripcion}>
                {espacio.esp_descripcion}
              </Paragraph>
            </ScrollView>
            {!esSeguidor && (
              <Button
                mode="contained"
                style={
                  espacio.esp_baneados.includes(auth._id) ? styles.buttonBanned :
                  espacio.esp_peticiones.includes(auth._id) ? styles.buttonSucces : styles.button
                }
                onPress={handleSubmit}
                disabled={espacio.esp_peticiones.includes(auth._id) || espacio.esp_baneados.includes(auth._id)}
                >
                {
                  espacio.esp_baneados.includes(auth._id) ? 'Baneado' :
                  espacio.esp_acceso ? 'Unirte al club' : 
                  espacio.esp_peticiones.includes(auth._id) ? 'Petición enviada' : 'Enviar petición'
                }
                
                
              </Button>
            )}
          </View>
        </ImageBackground>
      </View>
      {cargando && (
        <View style={styles.indicadorCargando}>
          <ActivityIndicator
            animating={true}
            color={'#be2e4a'}
            style={{flex: 1}}
          />
        </View>
      )}
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
  indicadorCargando: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  buttonSucces: {
    marginTop: 10,
    backgroundColor: '#26c963',
    fontWeight: 'bold',
    marginHorizontal: 50,
  },
  buttonBanned: {
    marginTop: 10,
    backgroundColor: '#c9c9c9',
    fontWeight: 'bold',
    marginHorizontal: 50,
  },
});

export default Espacio;
