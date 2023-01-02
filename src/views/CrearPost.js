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
import {Button, TextInput, ActivityIndicator, Avatar} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import useEspacio from '../hooks/useEspacio';
import useForo from '../hooks/useForo';
import LeftMenu from '../components/LeftMenu';

const CrearPost = ({navigation}) => {
  const {espacio} = useEspacio();
  const {postBorrador, setPostBorrador, crearPost, postCargando} = useForo();

  const [post_titulo, setTitulo] = useState('');
  const [post_contenido, setContenido] = useState('');
  const [post_media_img, setPostImg] = useState(undefined);
  const [post_media_id, setPostId] = useState('');
  const [imgpreview, setImgPreview] = useState('');

  useEffect(() => {
    if (postBorrador.post_titulo) {
      setTitulo(postBorrador.post_titulo);
      setContenido(postBorrador.post_contenido);
      setImgPreview(postBorrador.imgpreview);
    }
  }, []);

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

    if ( post_media_img !== undefined ) {
      if (post_media_img.size > 5000000) {
        ToastAndroid.show('El tamaño de la imagen no puede ser mayor a 5MB', ToastAndroid.SHORT );
        return;
      }
    }


    await crearPost({post_titulo, post_contenido, post_media_id, post_espacio: espacio._id}, post_media_img);
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

  if (postCargando) {
    return (
      <ActivityIndicator animating={true} color={'#be2e4a'} style={{flex: 1}} />
    );
  }

  return (
    <>
      <LeftMenu navigation={navigation} />

      <View style={styles.cabeceraPost}>
        <Text style={styles.tituloPost}>Nuevo Post</Text>
      </View>

      <ScrollView>
        <View style={styles.contenedorFormulario}>
          <Text style={styles.tituloFormulario}>Título</Text>
          <TextInput
            mode="outlined"
            style={styles.input}
            onChangeText={text => onChangeInputs('titulo', text)}
            value={post_titulo}
          />
          <Text style={styles.tituloFormulario}>Contenido</Text>
          <TextInput
            multiline={true}
            mode={'outlined'}
            dense={true}
            style={styles.inputContenido}
            value={post_contenido}
            onChangeText={text => onChangeInputs('contenido', text)}
          />

          <Text style={styles.tituloFormulario}>Imagen (opcional)</Text>
          <TouchableOpacity onPress={getImage}>
            {imgpreview === '' ? (
              <Image
                source={require('../assets/img_default.jpg')}
                style={styles.image}
              />
            ) : (
              <Image source={{uri: imgpreview}} style={styles.image} />
            )}
          </TouchableOpacity>

          <Button mode="contained" style={styles.boton} onPress={handleSubmit}>
            Crear Post
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  cabeceraPost: {
    marginTop: 20,
  },
  tituloPost: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
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
    backgroundColor: '#be2e4a',
    marginBottom: 20,
  },
});

export default CrearPost;
