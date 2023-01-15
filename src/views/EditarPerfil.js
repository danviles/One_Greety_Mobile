/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import useAuth from '../hooks/useAuth';
import Alerta from '../components/AlertaComponent';
import DocumentPicker from 'react-native-document-picker';
import ImagenPicker from '../components/ImagenPicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
  ToastAndroid,
  Animated,
} from 'react-native';
import {
  Text,
  Button,
  Dialog,
  Portal,
  ActivityIndicator,
  Avatar,
} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';

const EditarPerfil = ({navigation}) => {
  const {cargando, auth, obtenerPerfil, editarPerfil} = useAuth();

  const [mostrarpicker, setMostrarPicker] = useState(false);

  const [usu_nombre, setNombre] = useState('');
  const [usu_password, setPassword] = useState('');
  const [rpassword, setRPassword] = useState('');
  const [usu_perfil_img, setImgPerfil] = useState(undefined);
  const [usu_img_id, setImgId] = useState('');
  const [usu_twitter, setTwitter] = useState('');
  const [usu_youtube, setYoutube] = useState('');
  const [usu_soundcloud, setSoundCloud] = useState('');
  const [usu_instagram, setInstagram] = useState('');
  const [usu_tiktok, setTiktok] = useState('');
  const [imagen, setImagen] = useState('');
  const [imgpreview, setImgPreview] = useState('');

  useEffect(() => {
    const linkRegex = /^https?:\/\/[^\/]+/;
    obtenerPerfil();
    setNombre(auth.usu_nombre);
    setImgId(auth.usu_img_id);
    setImgPreview(auth.usu_perfil_img); 
    auth.usu_twitter && setTwitter(auth.usu_twitter.replace(linkRegex, '').replace('/', ''));
    auth.usu_youtube && setYoutube(auth.usu_youtube.replace(linkRegex, '').replace('/', ''));
    auth.usu_soundcloud && setSoundCloud(auth.usu_soundcloud.replace(linkRegex, '').replace('/', ''));
    auth.usu_instagram && setInstagram(auth.usu_instagram.replace(linkRegex, '').replace('/', ''));
    auth.usu_tiktok && setTiktok(auth.usu_tiktok.replace(linkRegex, '').replace('/', ''));
  }, []);

  const handleSubmit = async () => {
    const socialProfileRegex = /^(?!http)(?!www)(@?[a-zA-Z0-9_]+)$/;

    if ([usu_nombre].includes('')) {
      ToastAndroid.show(
        'Nombre de usuario no puede estar vacio',
        ToastAndroid.SHORT,
      );
      return;
    }

    if (![usu_password, rpassword].includes('')) {
      if (usu_password.length < 6) {
        ToastAndroid.show(
          'La contraseña debe tener al menos 6 caracteres',
          ToastAndroid.SHORT,
        );
        return;
      }
      if (usu_password !== rpassword) {
        ToastAndroid.show('Las contraseñas no coinciden', ToastAndroid.SHORT);
        return;
      }
    }

    if (usu_twitter !== '') {
      if (!socialProfileRegex.test(usu_twitter)) {
        ToastAndroid.show(
          'El usuario de Twitter no es válido',
          ToastAndroid.SHORT,
        );
        return;
      } 
    }

    if (usu_youtube !== '') {
      if (!socialProfileRegex.test(usu_youtube)) {
        ToastAndroid.show(
          'El usuario de Youtube no es válido',
          ToastAndroid.SHORT,
        );
        return;
      }
    }

    if (usu_soundcloud !== '') {
      if (!socialProfileRegex.test(usu_soundcloud)) {
        ToastAndroid.show(
          'El usuario de SoundCloud no es válido',
          ToastAndroid.SHORT,
        );
        return;
      } 
    }

    if (usu_instagram !== '') {
      if (!socialProfileRegex.test(usu_instagram)) {
        ToastAndroid.show(
          'El usuario de Instagram no es válido',
          ToastAndroid.SHORT,
        );
        return;
      } 
    }

    if (usu_tiktok !== '') {
      if (!socialProfileRegex.test(usu_tiktok)) {
        ToastAndroid.show(
          'El usuario de Tiktok no es válido',
          ToastAndroid.SHORT,
        );
        return;
      } 
    }

    await editarPerfil(
      {
        usu_nombre,
        usu_password,
        usu_img_id,
        usu_soundcloud,
        usu_instagram,
        usu_twitter,
        usu_youtube,
        usu_tiktok,
      },
      usu_perfil_img,
    );
  };

  const handleMenuPicker = () => {
    setMostrarPicker(true);
  };

  const getImage = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log(res);
      // console.log(URL.createObjectURL(res[0]))
      setImgPreview(res[0].uri);
      setImgPerfil(res[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  const handleImageCamera = async () => {
    // const options = {
    //   title: 'Selecciona una imagen',
    //   storageOptions: {
    //     skipBackup: true,
    //     path: 'images',
    //   },
    // };
    // await launchCamera(options)
    //   .then(async response => {
    //     if (response.didCancel) {
    //       return;
    //     }
    //     // const prueba = URL.createObjectURL(response.assets[0]);
    //     // console.log(prueba);
    //     // console.log(response);
    //     setImagen(response.assets[0]);
    //     setImgPreview(response.assets[0].uri);
    //     setImgPerfil(response.assets[0]);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  };

  const handleImageFile = async () => {
    // const options = {
    //   title: 'Selecciona una imagen',
    //   storageOptions: {
    //     skipBackup: true,
    //     path: 'images',
    //   },
    // };
    // await launchImageLibrary(options)
    //   .then(async response => {
    //     if (response.didCancel) {
    //       return;
    //     }
    //     //URL.createObjectURL(e.target.files[0]);
    //     setImagen(response.assets[0]);
    //     setImgPreview(response.assets[0].uri);
    //     setImgPerfil(response.assets[0].uri);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  };

  if (cargando) {
    return (
      <ActivityIndicator animating={true} color={'#be2e4a'} style={{flex: 1}} />
    );
  }

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity onPress={getImage}>
            {imgpreview === '' ? (
              <Avatar.Icon size={90} icon="account" />
            ) : (
              <Avatar.Image size={90} source={{uri: imgpreview}} />
            )}
          </TouchableOpacity>
          <View style={styles.formInput}>
            <Text>Nombre</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor="gray"
              value={usu_nombre}
              onChangeText={text => setNombre(text)}
              keyboardType="email-address"
            />
          </View>
          <View style={styles.formInput}>
            <Text>Contraseña (Opcional)</Text>
            <TextInput
              style={styles.inputPass}
              name="password"
              autoCapitalize="none"
              autoCorrect={false}
              enablesReturnKeyAutomatically
              placeholderTextColor="black"
              value={usu_password}
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.formInput}>
            <Text>Repite la contraseña (Opcional)</Text>
            <TextInput
              style={styles.inputPass}
              name="password"
              autoCapitalize="none"
              autoCorrect={false}
              enablesReturnKeyAutomatically
              placeholderTextColor="black"
              value={rpassword}
              onChangeText={text => setRPassword(text)}
              secureTextEntry={true}
            />
          </View>

          <Text style={styles.textoRedes}>Redes Sociales</Text>

          <View style={styles.contenedorRedes}>
            <View style={styles.redes}>
              <Avatar.Image
                size={35}
                style={styles.icono}
                source={require('../assets/twitter.png')}
              />
              <TextInput
                style={styles.inputRedes}
                placeholderTextColor="gray"
                placeholder="Twitter"
                value={usu_twitter}
                onChangeText={text => setTwitter(text)}
              />
            </View>
            <View style={styles.redes}>
              <Avatar.Image
                size={35}
                style={styles.icono}
                source={require('../assets/instagram.png')}
              />
              <TextInput
                style={styles.inputRedes}
                placeholderTextColor="gray"
                placeholder="Instagram"
                value={usu_instagram}
                onChangeText={text => setInstagram(text)}
              />
            </View>
            <View style={styles.redes}>
              <Avatar.Image
                size={35}
                style={styles.icono}
                source={require('../assets/soundcloud.png')}
              />
              <TextInput
                style={styles.inputRedes}
                placeholderTextColor="gray"
                placeholder="SoundCloud"
                value={usu_soundcloud}
                onChangeText={text => setSoundCloud(text)}
              />
            </View>
            <View style={styles.redes}>
              <Avatar.Image
                size={35}
                style={styles.icono}
                source={require('../assets/youtube.png')}
              />
              <TextInput
                style={styles.inputRedes}
                placeholderTextColor="gray"
                placeholder="Youtube"
                value={usu_youtube}
                onChangeText={text => setYoutube(text)}
              />
            </View>
            <View style={styles.redes}>
              <Avatar.Image
                size={35}
                style={styles.icono}
                source={require('../assets/tiktok.png')}
              />
              <TextInput
                style={styles.inputRedes}
                placeholderTextColor="gray"
                placeholder="Tiktok"
                value={usu_tiktok}
                onChangeText={text => setTiktok(text)}
              />
            </View>
          </View>

          <Button mode="contained" style={styles.button} onPress={handleSubmit}>
            Actualizar Perfil
          </Button>
        </View>
        <View style={{flex: 1}}>
          <Alerta
            title={'Usuario Actualizado'}
            desc={'Se ha actualizado tu perfil'}
            btext={'ok'}
          />
          {cargando && <ActivityIndicator animating={true} color={'#be2e4a'} />}
        </View>
        <Portal>
          <Dialog
            visible={mostrarpicker}
            onDismiss={() => setMostrarPicker(!mostrarpicker)}>
            <Dialog.Title>Usar la camara o subir una imagen</Dialog.Title>
            <Dialog.Content>
              <View style={styles.containerPicker}>
                <TouchableOpacity onPress={handleImageCamera}>
                  <MaterialCommunityIcons
                    name="camera"
                    size={60}
                    color={'#181318'}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleImageFile}>
                  <MaterialCommunityIcons
                    name="folder-image"
                    size={60}
                    color={'#181318'}
                  />
                </TouchableOpacity>
              </View>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setMostrarPicker(!mostrarpicker)}>
                Cerrar
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formInput: {
    marginBottom: 10,
    width: '100%',
  },
  input: {
    backgroundColor: 'white',
    shadowColor: 'black',
    borderRadius: 10,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  inputPass: {
    backgroundColor: 'white',
    shadowColor: 'black',
    borderRadius: 10,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  button: {
    width: '100%',
    shadowColor: 'black',
    borderRadius: 10,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: '#075985',
  },
  olvidePassword: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 50,
    marginTop: 10,
  },
  textOlvidePassword: {
    color: '#075985',
  },
  containerPicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  textoRedes: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#075985',
    marginTop: 20,
    marginBottom: 10,
  },
  contenedorRedes: {
    width: '100%',
    marginBottom: 20,
  },
  redes: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  icono: {
    marginRight: 10,
  },
  inputRedes: {
    backgroundColor: 'white',
    shadowColor: 'black',
    borderRadius: 10,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    width: '80%',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 10,
  },
});

export default EditarPerfil;
