/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useCallback, useEffect, useRef, useMemo} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Text,
} from 'react-native';
import {Button, ActivityIndicator, useTheme} from 'react-native-paper';
import Cabecera from '../components/Cabecera';
import PostPreview from '../components/PostPreview';
import useEspacio from '../hooks/useEspacio';
import useForo from '../hooks/useForo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {eliminarPost} from '../../../backend/controllers/postController';

const Foro = ({navigation}) => {
  const {colors} = useTheme();
  const {espacio, cargando, obtenerEspacio} = useEspacio();
  const {destacarPost, eliminarPost} = useForo();

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const [refreshing, setRefreshing] = useState(false);
  const [filterDestacados, setFilterDestacados] = useState(true);
  const [filterRecientes, setFilterRecientes] = useState(false);
  const [filterActividad, setFilterActividad] = useState(false);
  const [filter, setFilter] = useState('Destacados');
  const [fposts, setFposts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [post, setPost] = useState({});

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
  }, [filter, espacio]);

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
        [...espacio.esp_foro].filter(
          post => !post.post_tags.includes('Destacado'),
        ),
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

  const handlePressentModal = post => {
    setPost(post);
    bottomSheetModalRef.current?.present();
    setTimeout(() => {
      setIsOpen(true);
    }, 100);
  };

  const editarPostOption = () => {};

  const eliminarPostOption = () => {
    eliminarPost(post._id);
  };

  const destacarPostOption = () => {
    destacarPost(post._id);
  };

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
          {fposts.length > 0 &&
            fposts.map(post => (
              <View key={post._id}>
                <View style={styles.dotsMenuContainer}>
                  <TouchableOpacity onPress={() => handlePressentModal(post)}>
                    <MaterialCommunityIcons
                      name="dots-vertical"
                      color={'grey'}
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Post', {post})}
                  key={post._id}>
                  <PostPreview post={post} />
                </TouchableOpacity>
              </View>
            ))}
        </View>
      </ScrollView>
      {post._id ? (
        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            backgroundStyle={{borderRadius: 50, borderWidth: 1}}
            onDismiss={() => setIsOpen(false)}>
            <View style={styles.modalContainer}>
              <TouchableOpacity onPress={destacarPostOption}>
                <View style={styles.modalOption}>
                  <MaterialCommunityIcons
                    name="star-outline"
                    color={colors.amarillo}
                    size={30}
                  />
                  <Text style={styles.modalOptionText}>
                    {post.post_tags.includes('Destacado')
                      ? 'No Destacar'
                      : 'Destacar'}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.modalOption}>
                  <MaterialCommunityIcons
                    name="pencil-outline"
                    color={colors.verde}
                    size={30}
                  />
                  <Text style={styles.modalOptionText}>Editar</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={eliminarPostOption}>
                <View style={styles.modalOption}>
                  <MaterialCommunityIcons
                    name="delete-outline"
                    color={colors.rojo}
                    size={30}
                  />
                  <Text style={styles.modalOptionText}>Eliminar</Text>
                </View>
              </TouchableOpacity>
            </View>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      ) : null}
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
  dotsMenuContainer: {
    position: 'absolute',
    right: 5,
    top: 20,
    zIndex: 1,
  },
  modalContainer: {
    padding: 20,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalOptionText: {
    marginLeft: 20,
    fontSize: 20,
  },
});

export default Foro;
