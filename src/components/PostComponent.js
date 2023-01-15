import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {tiempoTranscurrido} from '../helpers/gestorFechas';

const PostComponent = ({post}) => {
  const {post_creador, createdAt, post_contenido, post_titulo, post_media_img, post_likes, post_comentarios } = post;
  const comentarios = post_comentarios.length + post_comentarios.reduce((acc, cur) => acc + cur.res_comentarios.length,  0);

  return (
    <View style={styles.postContenedor}>
      <View style={styles.postCabecera}>
        <View style={styles.postPerfil}>
          <Avatar.Image size={50} source={{uri: post_creador.usu_perfil_img}} />
          <View style={styles.postPerfilTexto}>
            <Text style={styles.postUsuarioTexto}>
              {post_creador.usu_nombre}
            </Text>
            <Text style={styles.postTiempoTexto}>
              {tiempoTranscurrido(createdAt)}
            </Text>
          </View>
        </View>
      </View>

      <Text style={styles.postTitulo}>{post_titulo}</Text>

      {post.post_tags.includes('Destacado') && (
        <View style={styles.postEtiqueta}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Destacado</Text>
          <MaterialCommunityIcons
            name="star-outline"
            color={'white'}
            size={20}
          />
        </View>
      )}

      <View style={styles.postContenido}>
        <Text style={styles.postContenidoTexto}>{post_contenido}</Text>
      </View>
      {post.post_media_img && (
        <View style={styles.postImagenContenedor}>
          <Image
            style={styles.postImagen}
            source={{uri: post_media_img}}
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
          <Text style={{color: '#9e9e9e', marginLeft: 5}}>{post_likes.length}</Text>
        </View>
        <View style={styles.postComentarios}>
          <MaterialCommunityIcons
            name="comment-outline"
            color={'#9e9e9e'}
            size={20}
          />
          <Text style={{color: '#9e9e9e', marginLeft: 5}}>{comentarios}</Text>
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
  postEtiqueta: {
    flexDirection: 'row',
    height: 30,
    width: 110,
    marginTop: 10,
    alignItems: 'center',
    paddingRight: 5,
    paddingLeft: 10,
    backgroundColor: '#ffca28',
    borderRadius: 100,
    justifyContent: 'center',
  },
  postTitulo: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  postContenido: {
    marginTop: 10,
  },
  postContenidoTexto: {
    fontSize: 16,
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
});

export default PostComponent;
