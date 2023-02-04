import React, {useState, useRef, useMemo, useEffect} from 'react';
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
import {Avatar, Button, ActivityIndicator, Menu} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LeftMenu from '../components/LeftMenu';
import PostComponent from '../components/PostComponent';
import RespuestaComponent from '../components/RespuestaComponent';
import Cabecera from '../components/Cabecera';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import MenuModal from '../components/MenuModal';
import useEspacio from '../hooks/useEspacio';
import useForo from '../hooks/useForo';

const Post = ({navigation, route}) => {
  const { post, postCargando, obtenerPost } = useForo();
  const {espacio} = useEspacio();

  const openModal = useRef(null);

  useEffect(() => {
  }, [post]);

  const handlePressentModal = () => {
    openModal.current?.mostrarModal();
  };

  if (postCargando) {
    return (
      <ActivityIndicator animating={true} color={'#be2e4a'} style={{flex: 1}} />
    );
  }

  return (
    <>
      <Cabecera titulo={'Foro'} />

      <ScrollView>
        <View style={styles.contenedor}>
          <View style={styles.dotsMenuContainer}>
            <TouchableOpacity onPress={handlePressentModal}>
              <MaterialCommunityIcons
                name="dots-vertical"
                color={'grey'}
                size={20}
              />
            </TouchableOpacity>
          </View>
          <PostComponent />
          {post.post_comentarios.length > 0 &&
            post.post_comentarios.map(com => (
              <RespuestaComponent
                key={com._id}
                navigation={navigation}
                com={com}
                post={post}
              />
            ))}
        </View>
      </ScrollView>

      <View style={styles.postStickyFooter}>
        <View style={styles.postComentarioContenedor}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('NuevoComentario', {
                titulo: post.post_titulo,
                id: post._id,
              })
            }>
            <Text style={styles.postComentarioTexto}>Añadir un comentario</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('NuevoComentario', {
                titulo: post.post_titulo,
                id: post._id,
              })
            }>
            <MaterialCommunityIcons
              name="image-outline"
              size={20}
              color={'#4178c5'}
            />
          </TouchableOpacity>
        </View>
      </View>
      <MenuModal openModal={openModal} />
    </>
  );
};

const dimensions = Dimensions.get('window');
// const imageHeight = Math.round((dimensions.width * 9) / 16);
const imageHeight = dimensions.height;
const imageWidth = dimensions.width;

const styles = StyleSheet.create({
  contenedor: {
    marginBottom: 53,
  },
  postContenedor: {
    marginTop: 5,
    padding: 20,
    backgroundColor: '#f5f5f5',
    shadowColor: '#000',
    elevation: 5,
    marginBottom: 10,
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
  postStickyFooter: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 10,
    backgroundColor: '#ffffff',
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
    fontSize: 16,
  },
  postComentariosContenedor: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  postComentarioContenido: {
    marginTop: 10,
    padding: 10,
  },
  dotsMenuContainer: {
    position: 'absolute',
    right: 5,
    top: 20,
    zIndex: 1,
  },
});

export default Post;
