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
import RespuestaSimple from './RespuestaSimple';

const RespuestaComponent = ({navigation, com, post}) => {
  const {post_creador} = post;
  const {res_creador, res_contenido, res_comentarios} = com;

  return (
    <View style={styles.postContenedor}>
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
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('NuevoComentario', {
              titulo: res_contenido,
              id: com._id,
            })
          }>
          <View style={styles.postComentarios}>
            <MaterialCommunityIcons
              name="reply-outline"
              color={'#26c963'}
              size={20}
            />
            <Text style={styles.responderTexto}>Responder</Text>
          </View>
        </TouchableOpacity>
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
      {res_comentarios.length > 0 &&
        res_comentarios.map(comres => (
          <RespuestaSimple
            key={comres._id}
            navigation={navigation}
            com={comres}
            post={post}
          />
        ))}
    </View>
  );
};

const dimensions = Dimensions.get('window');
// const imageHeight = Math.round((dimensions.width * 9) / 16);
const imageHeight = dimensions.height;
const imageWidth = dimensions.width;

const styles = StyleSheet.create({
  postContenedor: {
    marginTop: 5,
    padding: 20,
    backgroundColor: '#f5f5f5',
    shadowColor: '#000',
    elevation: 5,
    marginBottom: 10,
  },
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
    borderTopWidth: 1,
    borderTopColor: '#9e9e9e',
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
  postComentarios: {
    flexDirection: 'row',
    padding: 10,
  },
  responderTexto: {
    color: '#26c963',
    marginLeft: 5,
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
    height: '50%',
    width: imageWidth,
    resizeMode: 'stretch',
  },
});

export default RespuestaComponent;
