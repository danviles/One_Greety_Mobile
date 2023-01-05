import React, {useState} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {TextInput, Button} from 'react-native-paper';
import LeftMenu from '../components/LeftMenu';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const NuevoComentario = ({navigation, route}) => {
  const {post} = route.params;

  const [comentario, setComentario] = useState('');

  return (
    <>
      <LeftMenu navigation={navigation} />

      <View style={styles.cabecera}>
        <Text style={styles.textoCabecera}>Nuevo Comentario</Text>
        <TouchableOpacity>
          <View style={styles.nuevoPostIcon}>
            <MaterialCommunityIcons
              name="pencil-plus-outline"
              color={'white'}
              size={20}
            />
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {/* <View style={styles.contenedorNuevoComentario}> */}

        <View style={styles.contenedorComentario}>
          <View style={styles.contenedorTitulo}>
            <Text style={styles.textoTitulo}>{post.post_titulo}</Text>
          </View>
          <View style={styles.contenedorInput}>
            <TextInput
              mode="outlined"
              style={styles.input}
              multiline={true}
              placeholder="Escribe tu comentario"
              onChangeText={text => setComentario(text)}
              value={comentario}
            />
          </View>
          <Image></Image>
        </View>

        {/* </View> */}
      </ScrollView>
      <View style={styles.contenedorBoton}>
        <Button
          buttonColor="#26a0c9"
          mode="contained"
          style={styles.boton}
          onPress={() => console.log('Subir Imagen')}>
          Subir Imagen
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  cabecera: {
    marginTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#b3b3b3ff',
    marginBottom: 10,
  },
  textoCabecera: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  nuevoPostIcon: {
    backgroundColor: '#26c963',
    width: 40,
    height: 40,
    borderRadius: 100,
    position: 'absolute',
    top: -30,
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
});

export default NuevoComentario;
