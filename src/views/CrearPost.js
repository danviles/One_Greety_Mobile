import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  Button,
  TextInput,
  ActivityIndicator,
  useTheme,
} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import useEspacio from '../hooks/useEspacio';
import useForo from '../hooks/useForo';
import LeftMenu from '../components/LeftMenu';
import Cabecera from '../components/Cabecera';
import {theme} from '../core/theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CrearPost = ({navigation}) => {
  const {espacio} = useEspacio();
  const {colors} = useTheme();
  const {
    post,
    editarPost,
    postBorrador,
    setPostBorrador,
    crearPost,
    postCargando,
    setPost,
  } = useForo();

  const [post_titulo, setTitulo] = useState('');
  const [post_contenido, setContenido] = useState('');
  const [post_media_img, setPostImg] = useState(undefined);
  const [post_media_id, setPostMediaId] = useState('');
  const [post_id, setPostId] = useState('');
  const [imgpreview, setImgPreview] = useState('');
  const [numCaracteres, setNumCaracteres] = useState(150);
  const [numCaracteresContenido, setNumCaracteresContenido] = useState(2000);

  useEffect(() => {
    if (postBorrador.post_titulo) {
      setTitulo(postBorrador.post_titulo);
      setContenido(postBorrador.post_contenido);
      setImgPreview(postBorrador.imgpreview);
    }
  }, []);

  useEffect(() => {
    if (post._id) {
      setPostId(post._id);
      setTitulo(post.post_titulo);
      setContenido(post.post_contenido);
    }
    if (post.post_media_id) {
      setPostImg(post.post_media_img);
      setImgPreview(post.post_media_img);
      setPostMediaId(post.post_media_id);
    }
  }, [post]);

  const onChangeInputs = (input, texto) => {
    switch (input) {
      case 'titulo':
        setTitulo(texto);
        break;
      case 'contenido':
        setContenido(texto);
        break;
      default:
        break;
    }
    setPostBorrador({post_titulo, post_contenido, imgpreview});
  };

  const handleSubmit = async () => {
    if ([post_titulo, post_contenido].includes('')) {
      ToastAndroid.show(
        'Para crear un post al menos debe haber un titulo y un contenido.',
        ToastAndroid.SHORT,
      );
      return;
    }

    if (post_titulo.length > 150) {
      ToastAndroid.show(
        'El titulo no puede tener mas de 300 caracteres',
        ToastAndroid.SHORT,
      );
      return;
    }

    if (post_media_img !== undefined) {
      if (post_media_img.size > 10000000) {
        ToastAndroid.show(
          'El tamaño de la imagen no puede ser mayor a 5MB',
          ToastAndroid.SHORT,
        );
        return;
      }
    }

    if (post._id) {
      await editarPost(
        {post_titulo, post_contenido, post_media_id, post_espacio: espacio._id},
        post_media_img,
        post_id,
      );
    } else {
      await crearPost(
        {post_titulo, post_contenido, post_media_id, post_espacio: espacio._id},
        post_media_img,
      );
    }

    setPostBorrador({});
    navigation.navigate('Foro');
  };

  const getImage = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setImgPreview(res[0].uri);
      setPostImg(res[0]);
      setPostBorrador({post_titulo, post_contenido, imgpreview});
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  const eliminarImagen = () => {
    setImgPreview('');
    setPostImg('eliminar');
  };

  if (postCargando) {
    return (
      <ActivityIndicator animating={true} color={'#be2e4a'} style={{flex: 1}} />
    );
  }

  return (
    <>
      <Cabecera
        titulo={'Nuevo Post'}
        icono={'file-image-plus-outline'}
        color={colors.azul}
        func={getImage}
      />

      <KeyboardAwareScrollView>
        <ScrollView>
          <View style={styles.contenedorFormulario}>
            <Text style={styles.tituloFormulario}>Título</Text>
            <TextInput
              mode="outlined"
              style={styles.input}
              onChangeText={text => onChangeInputs('titulo', text)}
              value={post_titulo}
              maxLength={numCaracteres}
            />
            <View style={styles.numCaracteresContenedor}>
              <Text
                style={[
                  styles.numCaracteres,
                  {
                    color:
                      numCaracteres - post_titulo.length > 0
                        ? 'grey'
                        : colors.rojo,
                  },
                ]}>
                {numCaracteres - post_titulo.length}
              </Text>
            </View>
            <Text style={styles.tituloFormulario}>Contenido</Text>
            <TextInput
              multiline={true}
              mode={'outlined'}
              dense={true}
              style={styles.inputContenido}
              value={post_contenido}
              onChangeText={text => onChangeInputs('contenido', text)}
              maxLength={numCaracteresContenido}
            />
            <View style={styles.numCaracteresContenedor}>
              <Text
                style={[
                  styles.numCaracteres,
                  {
                    color:
                      numCaracteresContenido - post_contenido.length > 0
                        ? 'grey'
                        : colors.rojo,
                  },
                ]}>
                {numCaracteresContenido - post_contenido.length}
              </Text>
            </View>
            {imgpreview && (
              <View style={styles.contenedorImagen}>
                <Image source={{uri: imgpreview}} style={styles.image} />
                <TouchableOpacity onPress={eliminarImagen}>
                  <MaterialCommunityIcons
                    name="close-circle-outline"
                    color={'#ff0000'}
                    size={30}
                    style={styles.quitarImagenIcono}
                  />
                </TouchableOpacity>
              </View>
            )}

            <Button
              mode="contained"
              style={styles.boton}
              onPress={handleSubmit}>
              {post._id ? 'Editar Post' : 'Crear Post'}
            </Button>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  contenedorFormulario: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  tituloFormulario: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'white',
    marginBottom: 20,
  },
  inputContenido: {
    backgroundColor: 'white',
    marginBottom: 20,
  },
  image: {
    flex: 1,
    width: 370,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  boton: {
    backgroundColor: theme.colors.verde,
    marginBottom: 20,
  },
  numCaracteresContenedor: {
    alignItems: 'flex-end',
    marginTop: -20,
    marginBottom: 10,
  },
  numCaracteres: {
    fontSize: 16,
  },
  contenedorImagen: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  quitarImagenIcono: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CrearPost;
