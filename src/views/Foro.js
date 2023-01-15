/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {Avatar, Button, ActivityIndicator, useTheme} from 'react-native-paper';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Cabecera from '../components/Cabecera';
import LeftMenu from '../components/LeftMenu';
import PostPreview from '../components/PostPreview';
import useEspacio from '../hooks/useEspacio';

const Foro = ({navigation}) => {
  const {colors} = useTheme();
  const {espacio, cargando, obtenerEspacio} = useEspacio();

  const [refreshing, setRefreshing] = useState(false);
  const [filterDestacados, setFilterDestacados] = useState(true);
  const [filterRecientes, setFilterRecientes] = useState(false);
  const [filterActividad, setFilterActividad] = useState(false);
  const [filter, setFilter] = useState('Destacados');
  const [fposts, setFposts] = useState([]);

  // useEffect(() => {
  //   setFposts([...espacio.esp_foro]);
  //   sortDestacados();
  // }, [espacio]);

  useEffect(() => {
    if (filter === 'Destacados') {
      sortDestacados();
    }
    if (filter === 'Recientes') {
      sortRecientes();
    }
    if (filter === 'Actividad') {
      sortActividad();
    }

  }, [filter]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    obtenerEspacio(espacio._id);
    setRefreshing(false);
  }, []);

  const handleFilter = op => {
    switch (op) {
      case 'Destacados':
        setFilterDestacados(true);
        setFilterRecientes(false);
        setFilterActividad(false);
        break;
      case 'Recientes':
        setFilterDestacados(false);
        setFilterRecientes(true);
        setFilterActividad(false);
        break;
      case 'Actividad':
        setFilterDestacados(false);
        setFilterRecientes(false);
        setFilterActividad(true);
        break;
      default:
        break;
    }
  };

  const sortDestacados = () => {
    const fposts = [...espacio.esp_foro]
      .filter(post => post.post_tags.includes('Destacado'))
      .concat(
        [...espacio.esp_foro].filter(post => !post.post_tags.includes('Destacado')),
      );
    setFposts(fposts);
    handleFilter('Destacados');
  };

  const sortRecientes = () => {
    const fposts = [...espacio.esp_foro].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
    setFposts(fposts);
    handleFilter('Recientes');
  };

  const sortActividad = () => {

    const fposts = [...espacio.esp_foro].sort(
      (a, b) =>
        b.post_comentarios.length +
        b.post_comentarios.reduce(
          (acc, cur) => acc + cur.res_comentarios.length,
          0,
        ) -
        (a.post_comentarios.length +
          a.post_comentarios.reduce(
            (acc, cur) => acc + cur.res_comentarios.length,
            0,
          )),
    );
    setFposts(fposts);
    handleFilter('Actividad');
  };

  // const filter =
  // searchQuery === ''
  //   ? espacios
  //   : espacios
  //       .filter(espacio =>
  //         espacio.esp_nombre
  //           .toLowerCase()
  //           .includes(searchQuery.toLowerCase()),
  //       )
  //       .concat(
  //         espacios.filter(espacio =>
  //           espacio.esp_administrador.usu_nombre
  //             .toLowerCase()
  //             .includes(searchQuery.toLowerCase()),
  //         ),
  //       )
  //       .reduce((acc, item) => {
  //         if (!acc.includes(item)) {
  //           acc.push(item);
  //         }
  //         return acc;
  //       }, []);

  const filterPost = () => {
    let fposts = [];
    if (filterDestacados) {
      fposts = espacio.esp_foro
        .filter(post => post.post_tags.includes('Destacado'))
        .concat(
          espacio.esp_foro.filter(
            post => !post.post_tags.includes('Destacado'),
          ),
        );
      setFposts(fposts);
    } else if (filterRecientes) {
      fposts = espacio.esp_foro.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
      setFposts(fposts);
    } else if (filterActividad) {
      fposts = espacio.esp_foro.sort(
        (a, b) =>
          b.post_comentarios.length +
          b.post_comentarios.reduce(
            (acc, cur) => acc + cur.res_comentarios.length,
            0,
          ) -
          (a.post_comentarios.length +
            a.post_comentarios.reduce(
              (acc, cur) => acc + cur.res_comentarios.length,
              0,
            )),
      );
      setFposts(fposts);
    }
  };

  // post_comentarios.length + post_comentarios.reduce((acc, cur) => acc + cur.res_comentarios.length,  0)

  if (cargando) {
    return (
      <ActivityIndicator animating={true} color={'#be2e4a'} style={{flex: 1}} />
    );
  }

  return (
    <>
      <Cabecera
        titulo={'Foro'}
        icono={'pencil-plus-outline'}
        color={colors.verde}
        func={() => navigation.navigate('CrearPost')}
      />

      <View style={styles.filtroForo}>
        <Button
          textColor={!filterDestacados && 'black'}
          mode="outlined"
          style={styles.button}
          onPress={() => setFilter('Destacados')}>
          Destacados
        </Button>
        <Button
          textColor={!filterRecientes && 'black'}
          mode="outlined"
          style={styles.button}
          onPress={() => setFilter('Recientes')}>
          Recientes
        </Button>
        <Button
          textColor={!filterActividad && 'black'}
          mode="outlined"
          style={styles.button}
          onPress={() => setFilter('Actividad')}>
          Actividad
        </Button>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.posts}>
          {/* {espacio.esp_foro.length > 0 &&
            espacio.esp_foro.map(post => (
              <TouchableOpacity onPress={() => navigation.navigate('Post', {post})} key={post._id}>
                <PostPreview post={post} />
              </TouchableOpacity>
            ))} */}
          {fposts.length > 0 &&
            fposts.map(post => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Post', {post})}
                key={post._id}>
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
