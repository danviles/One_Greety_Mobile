import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const RespuestaSimple = ({navigation, com, post}) => {
  const {post_creador} = post;
  const {res_creador, res_contenido} = com;

  return (
    <View style={styles.respuestaSimpleContenedor}>
      <View style={styles.postCabecera}>
        <View style={styles.postPerfil}>
          <Avatar.Image size={50} source={{uri: res_creador.usu_perfil_img}} />
          <View style={styles.postPerfilTexto}>
            <Text style={styles.postUsuarioTexto}>
              {res_creador.usu_nombre}
            </Text>
            <Text style={styles.postTiempoTexto}>hace 1 hora</Text>
          </View>
        </View>
      </View>
      <View style={styles.postComentarioContenido}>
        <Text style={styles.postComentarioTexto}>{res_contenido}</Text>
      </View>
      {com.res_media_img && (
        <View style={styles.postImagenContenedor}>
          <Image
            style={styles.postImagen}
            source={{uri: com.res_media_img}}
          />
        </View>
      )}
      <View style={styles.postOptionsContenedor}>
        <View style={styles.postLikes}>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="thumb-up-outline"
              color={'#9e9e9e'}
              size={20}
            />
          </TouchableOpacity>
          <Text style={{color: '#9e9e9e', marginLeft: 5}}>0</Text>
        </View>
      </View>
    </View>
  );
};

const dimensions = Dimensions.get('window');
// const imageHeight = Math.round((dimensions.width * 9) / 16);
const imageHeight = dimensions.height;
const imageWidth = dimensions.width;

const styles = StyleSheet.create({

  postCabecera: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postPerfil: {
    flexDirection: 'row',
  },
  postPerfilTexto: {
    marginLeft: 10,
  },
  postUsuarioTexto: {
    fontWeight: 'bold',
  },
  postTiempoTexto: {
    color: '#9e9e9e',
  },
  postOptionsContenedor: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: '#9e9e9e',
    marginHorizontal: -20,
    marginBottom: -20,
    marginTop: 10,
  },
  postLikes: {
    flexDirection: 'row',
    padding: 10,
  },
  postComentarioTexto: {
    fontSize: 16,
  },
  postComentarioContenido: {
    marginTop: 10,
    padding: 10,
  },
  respuestaSimpleContenedor: {
    marginTop: 10,
    padding: 20,
    marginBottom: 10,
  },
  postImagenContenedor: {
    marginTop: 10,
    marginHorizontal: -20,
    resizeMode: 'contain',
  },
  postImagen: {
    height: imageHeight,
    width: imageWidth,
    resizeMode: 'stretch',
  },
});

export default RespuestaSimple;
