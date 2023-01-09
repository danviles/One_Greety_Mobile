/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {Avatar, Button, ActivityIndicator, useTheme} from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Cabecera from '../components/Cabecera';
import LeftMenu from '../components/LeftMenu';
import PostPreview from '../components/PostPreview';
import useEspacio from '../hooks/useEspacio';

const Foro = ({navigation}) => {
  const {colors} = useTheme();
  const {espacio, cargando, obtenerEspacio} = useEspacio();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    obtenerEspacio(espacio._id);
    setRefreshing(false);
  }, []);

  if (cargando) {
    return (
      <ActivityIndicator animating={true} color={'#be2e4a'} style={{flex: 1}} />
    );
  }

  return (
    <>
      {/* <LeftMenu navigation={navigation} /> */}

      {/* <View style={styles.cabeceraPost}>
        <Text style={styles.tituloForo}>Foro</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CrearPost')}>
          <View style={styles.nuevoPostIcon}>
            <MaterialCommunityIcons
              name="pencil-plus-outline"
              color={'white'}
              size={20}
            />
          </View>
        </TouchableOpacity>
      </View> */}

      <Cabecera titulo={'Foro'} icono={'pencil-plus-outline'} color={colors.verde} func={() => navigation.navigate('CrearPost')}/>

      <View style={styles.filtroForo}>
        <Button mode="outlined" style={styles.button}>
          Destacados
        </Button>
        <Button textColor="black" mode="outlined" style={styles.button}>
          Recientes
        </Button>
        <Button textColor="black" mode="outlined" style={styles.button}>
          Actividad
        </Button>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.posts}>
          {espacio.esp_foro.length > 0 &&
            espacio.esp_foro.map(post => (
              <TouchableOpacity onPress={() => navigation.navigate('Post', {post})} key={post._id}>
                <PostPreview post={post} />
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  cabeceraPost: {
    marginTop: 20,
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
  tituloForo: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  filtroForo: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#',
    flex: 1,
    fontWeight: 'bold',
    width: '50%',
    marginHorizontal: 5,
  },
  posts: {
    marginTop: 20,
  },
});

export default Foro;
