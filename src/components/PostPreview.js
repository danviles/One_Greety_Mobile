import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useAuth from '../hooks/useAuth';


const PostPreview = ({post, auth}) => {

  const {usu_perfil_img, usu_nombre} = auth;
  const {post_titulo} = post;


  return (
    <View style={styles.postContenedor}>
      <View style={styles.postCabecera}>
        <View style={styles.postPerfil}>
          <Avatar.Image size={50} source={{uri: usu_perfil_img}} />
          <View style={styles.postPerfilTexto}>
            <Text style={styles.postUsuarioTexto}>{usu_nombre}</Text>
            <Text style={styles.postTiempoTexto}>hace 1 hora</Text>
          </View>
        </View>
        <View style={styles.postEtiqueta}>
          <MaterialCommunityIcons
            name="star-outline"
            color={'white'}
            size={30}
          />
        </View>
      </View>
      <View style={styles.postTituloContenedor}>
        <Text style={styles.postTitulo}>{post_titulo}</Text>
        <View style={styles.postContadorContenedor}>
          <Text style={styles.postContadorTexto}>0</Text>
          <MaterialCommunityIcons
            name="comment-text-outline"
            color={'grey'}
            size={20}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContenedor: {
    marginTop: 10,
    padding: 20,
    backgroundColor: '#f5f5f5',
    shadowColor: '#000',
    elevation: 5,
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
    height: 35,
    width: 35,
    paddingHorizontal: 2.5,
    backgroundColor: '#ffca28',
    borderRadius: 100,
    justifyContent: 'center',
  },
  postTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#424242',
  },
  postContadorContenedor: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postTituloContenedor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postContadorTexto: {
    color: '#9e9e9e',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginRight: 5,
  },
});

export default PostPreview;
