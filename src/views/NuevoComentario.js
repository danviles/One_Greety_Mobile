import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {TextInput, Button, ActivityIndicator, useTheme} from 'react-native-paper';
import LeftMenu from '../components/LeftMenu';
import Cabecera from '../components/Cabecera';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useForo from '../hooks/useForo';
import DocumentPicker from 'react-native-document-picker';


const NuevoComentario = ({navigation, route}) => {
  const {colors} = useTheme();
  const {titulo, id} = route.params;
  const {post, crearComentario, postCargando} = useForo();

  const [res_contenido, setResContenido] = useState('');
  const [res_media_img, setResMediaImg] = useState(undefined);
  const [res_media_id, setResMediaId] = useState('');
  const [imgPreview, setImgPreview] = useState(null);

  const getImage = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setImgPreview(res[0].uri);
      setResMediaImg(res[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  const handleSubmit = async () => {
    if ([res_contenido].includes('')) {
      ToastAndroid.show(
        'Para crear un post al menos debe haber un titulo y un contenido.',
        ToastAndroid.SHORT,
      );
      return;
    }

    if ( res_media_img !== undefined ) {
      if (res_media_img.size > 10000000) {
        ToastAndroid.show('El tamaño de la imagen no puede ser mayor a 5MB', ToastAndroid.SHORT );
        return;
      }
    }


    await crearComentario({res_contenido, res_media_id}, id, post._id, res_media_img);

    navigation.goBack();
  };

  if (postCargando) {
    return <ActivityIndicator animating={true} color={'#be2e4a'} style={{flex: 1}}/>;
  }

  return (
    <>

      <Cabecera titulo={'Nuevo Comentario'} icono={'file-image-plus-outline'} color={colors.azul} func={getImage}/>

      <ScrollView>
        {/* <View style={styles.contenedorNuevoComentario}> */}

        <View style={styles.contenedorComentario}>
          <View style={styles.contenedorTitulo}>
            <Text style={styles.textoTitulo}>{titulo}</Text>
          </View>
          <View style={styles.contenedorInput}>
            <TextInput
              mode="outlined"
              style={styles.input}
              multiline={true}
              placeholder="Escribe tu comentario"
              onChangeText={text => setResContenido(text)}
              value={res_contenido}
            />
          </View>
          {imgPreview && (
            <View style={styles.contenedorImagen}>
              <Image source={{uri: imgPreview}} style={styles.image} />
            </View>
          )}
        </View>

        {/* </View> */}
      </ScrollView>
      <View style={styles.contenedorBoton}>
        <Button
          mode="contained"
          style={styles.boton}
          onPress={handleSubmit}>
          Crear Comentario
        </Button>
      </View>
    </>
  );
};

const dimensions = Dimensions.get('window');
const imageHeight = dimensions.height;
const imageWidth = dimensions.width;

const styles = StyleSheet.create({

  contenedorComentario: {
    paddingHorizontal: 10,
  },
  contenedorTitulo: {
    paddingHorizontal: 10,
  },
  textoTitulo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  contenedorInput: {
    marginBottom: 20,
  },
  input: {},
  contenedorBoton: {
    borderTopWidth: 1,
    borderTopColor: '#b3b3b3ff',
    padding: 10,
  },
  boton: {
    backgroundColor: '#26c963',
    color: 'white',
  },
  contenedorImagen: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: imageHeight,
    width: imageWidth,
    resizeMode: 'stretch',
  },
});

export default NuevoComentario;
