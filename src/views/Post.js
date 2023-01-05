import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Image,
  Dimensions,
  Modal,
  Alert,
} from 'react-native';
import {Avatar, Button, ActivityIndicator} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LeftMenu from '../components/LeftMenu';

const Post = ({navigation, route}) => {
  const {post} = route.params;
  const {post_creador} = post;

  return (
    <>
      <LeftMenu navigation={navigation} />

      <View style={styles.cabeceraPost}>
        <Text style={styles.tituloForo}>Foro</Text>
      </View>

      <ScrollView>
        <View style={styles.postContenedor}>
          <View style={styles.postCabecera}>
            <View style={styles.postPerfil}>
              <Avatar.Image
                size={50}
                source={{uri: post_creador.usu_perfil_img}}
              />
              <View style={styles.postPerfilTexto}>
                <Text style={styles.postUsuarioTexto}>
                  {post_creador.usu_nombre}
                </Text>
                <Text style={styles.postTiempoTexto}>hace 1 hora</Text>
              </View>
            </View>
          </View>

          <Text style={styles.postTitulo}>{post.post_titulo}</Text>

          <View style={styles.postEtiqueta}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Destacado</Text>
            <MaterialCommunityIcons
              name="star-outline"
              color={'white'}
              size={20}
            />
          </View>

          <View style={styles.postContenido}>
            <Text style={styles.postContenidoTexto}>{post.post_contenido}</Text>
          </View>
          <View style={styles.postImagenContenedor}>
            <Image
              style={styles.postImagen}
              source={{uri: post.post_media_img}}
            />
          </View>

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
            <View style={styles.postComentarios}>
              <MaterialCommunityIcons
                name="comment-outline"
                color={'#9e9e9e'}
                size={20}
              />
              <Text style={{color: '#9e9e9e', marginLeft: 5}}>0</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.postStickyFooter}>
        <View style={styles.postComentarioContenedor}>
          <TouchableOpacity onPress={() => navigation.navigate('NuevoComentario', {post})} >
            <Text style={styles.postComentarioTexto}>Añadir un comentario</Text>
          </TouchableOpacity>
          <TouchableOpacity >
            <MaterialCommunityIcons
              name="image-outline"
              size={20}
              color={'#4178c5'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
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
    marginBottom: 20,
  },
  cabeceraPost: {
    marginTop: 20,
    padding: 10,
  },
  tituloForo: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
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
    marginBottom: 20,
  },
  postLikes: {
    flexDirection: 'row',
    padding: 10,
  },
  postComentarios: {
    flexDirection: 'row',
    padding: 10,
  },
  postStickyFooter: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 10,
    backgroundColor: '#f5f5f5',
    shadowColor: '#000',
    elevation: 5,
  },
  postComentarioContenedor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#dbdbdb',
  },
  postComentarioTexto: {
    color: '#6f6f6f',
  },
  modalContenedor: {
    backgroundColor: '#ffffffff',
    height: imageHeight,
    width: imageWidth,
  },
});

export default Post;
