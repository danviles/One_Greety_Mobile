import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Avatar, Button, ActivityIndicator} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LeftMenu from '../components/LeftMenu';
import PostPreview from '../components/PostPreview';
import useEspacio from '../hooks/useEspacio';
import useAuth from '../hooks/useAuth';

const Foro = ({navigation}) => {
  const {espacio, cargando} = useEspacio();
  const {auth, usu_perfil_img} = useAuth();

  if (cargando) {
    return (
      <ActivityIndicator animating={true} color={'#be2e4a'} style={{flex: 1}} />
    );
  }

  return (
    <>
      <LeftMenu navigation={navigation} />
      <View style={styles.cabeceraPost}>
        <Text style={styles.tituloForo}>Foro</Text>
        <View style={styles.nuevoPostIcon}>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('Espacio')}>
            <MaterialCommunityIcons
              name="pencil-plus-outline"
              color={'white'}
              size={20}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>

      <View style={styles.filtroForo}>
        <Button mode="outlined" style={styles.button}>
          Destacados
        </Button>
        <Button textColor="black" mode="outlined" style={styles.button}>
          Recientes
        </Button>
        <Button textColor="black" mode="outlined" style={styles.button}>
          Actividad
        </Button>
      </View>

      <View style={styles.posts}>
        { espacio.esp_foro.length > 0 && espacio.esp_foro.map(post => (
          <PostPreview key={post} auth={auth} post={post} />
        ))}
      </View>

      {/* <View style={styles.espacioContainer}>
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
      </View> */}
    </>
  );
};

const styles = StyleSheet.create({
  cabeceraPost: {
    marginTop: 20,
  },
  nuevoPostIcon: {
    backgroundColor: '#26c963' ,
    width: 40,
    height: 40,
    borderRadius: 100,
    position: 'absolute',
    top: -5,
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tituloForo: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  filtroForo: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#',
    flex: 1,
    fontWeight: 'bold',
    width: '50%',
    marginHorizontal: 5,
  },
  posts: {
    marginTop: 20,
  },
});

export default Foro;
