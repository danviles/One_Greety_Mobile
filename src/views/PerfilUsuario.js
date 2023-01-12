import React, {useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Linking,
  Touchable,
} from 'react-native';
import {ActivityIndicator, Avatar} from 'react-native-paper';
import useAuth from '../hooks/useAuth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuPrincipal from '../components/MenuPrincipal';
import LeftMenu from '../components/LeftMenu';
import {TouchableOpacity} from 'react-native-gesture-handler';
import PreviewEspacioPerfil from '../components/PreviewEspacioPerfil';
import { useNavigation } from '@react-navigation/native';


const PerfilUsuario = ({route}) => {
  const navigation = useNavigation();
  const {id} = route.params;
  const {obtenerPerfilUsuario, perfilUsuario, cargando} = useAuth();

  useEffect(() => {
    obtenerPerfilUsuario(id);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      obtenerPerfilUsuario(id);
    }, []),
  );

  if (cargando) {
    return (
      <ActivityIndicator animating={true} color={'#be2e4a'} style={{flex: 1}} />
    );
  }

  const handleRedSocial = redSocial => {
    switch (redSocial) {
      case 'twitter':
        Linking.openURL(perfilUsuario.usu_twitter);
        break;
      case 'youtube':
        Linking.openURL(perfilUsuario.usu_youtube);
        break;
      case 'soundcloud':
        Linking.openURL(perfilUsuario.usu_soundcloud);
        break;
      case 'instagram':
        Linking.openURL(perfilUsuario.usu_instagram);
        break;
      case 'tiktok':
        Linking.openURL(perfilUsuario.usu_tiktok);
        break;
    }
  };

  return (
    <>
      <View style={styles.contenedorPerfil}>
        <Avatar.Image size={90} source={{uri: perfilUsuario.usu_perfil_img}} />
        <Text style={styles.textoNombreUsuario}>
          {perfilUsuario.usu_nombre}
        </Text>
        <View style={styles.contenedorRedes}>
          {perfilUsuario.usu_twitter && (
            <TouchableOpacity onPress={() => handleRedSocial('twitter')}>
              <Avatar.Image
                size={35}
                source={require('../assets/twitter.png')}
              />
            </TouchableOpacity>
          )}
          {perfilUsuario.usu_youtube && (
            <TouchableOpacity onPress={() => handleRedSocial('youtube')}>
              <Avatar.Image
                size={35}
                source={require('../assets/youtube.png')}
              />
            </TouchableOpacity>
          )}
          {perfilUsuario.usu_soundcloud && (
            <TouchableOpacity onPress={() => handleRedSocial('soundcloud')}>
              <Avatar.Image
                size={35}
                source={require('../assets/soundcloud.png')}
              />
            </TouchableOpacity>
          )}
          {perfilUsuario.usu_instagram && (
            <TouchableOpacity onPress={() => handleRedSocial('instagram')}>
              <Avatar.Image
                size={35}
                source={require('../assets/instagram.png')}
              />
            </TouchableOpacity>
          )}
          {perfilUsuario.usu_tiktok && (
            <TouchableOpacity onPress={() => handleRedSocial('tiktok')}>
              <Avatar.Image
                size={35}
                source={require('../assets/tiktok.png')}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Text style={styles.textoSeguidor}>Seguidor de: </Text>
      <View style={styles.contenedorEspacios}>
        <ScrollView>
          {perfilUsuario.usu_espacios ? (
            perfilUsuario.usu_espacios.map(espacio => (
                <PreviewEspacioPerfil key={espacio._id} espacio={espacio} />
            ))
          ) : (
            <Text>No hay espacios</Text>
          )}
        </ScrollView>
      </View>
    </>
  );
};

const dimensions = Dimensions.get('window');
const heightMobile = dimensions.height;

const styles = StyleSheet.create({
  contenedorPerfil: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  textoNombreUsuario: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  contenedorRedes: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 10,
    width: '60%',
  },
  textoSeguidor: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  contenedorEspacios: {
    display: 'flex',
    marginHorizontal: 10,
    marginTop: 10,
    height: heightMobile * 0.6,
  },
});

export default PerfilUsuario;
