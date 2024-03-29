import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import {Drawer} from 'react-native-paper';
import useEspacio from '../hooks/useEspacio';
import useAuth from '../hooks/useAuth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const LeftMenu = ({}) => {
  const navigation = useNavigation();
  const [abrirMenu] = useState(new Animated.Value(-100));
  const [mostrarmenu, setMostrarMenu] = useState(true);
  const {espacio, dejarEspacio} = useEspacio();
  const {auth} = useAuth();

  const handleMenu = () => {
    if (mostrarmenu) {
      Animated.timing(abrirMenu, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(abrirMenu, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
    setMostrarMenu(!mostrarmenu);
  };

  const estiloAnimacionAbrir = {
    transform: [{translateX: abrirMenu}],
  };

  const handleDejarEspacio = () => {
    dejarEspacio(espacio._id);
  }


  if (!espacio.esp_seguidores.find(item => item === auth._id)) {
    return (
      <Animated.View style={styles.botonMenu}>
        <MaterialCommunityIcons name="menu" color={'#b4b4b4'} size={20} />
      </Animated.View>
    );
  }

  return (
    <>
      {mostrarmenu && (
        <TouchableWithoutFeedback onPress={handleMenu}>
          <Animated.View style={styles.botonMenu}>
            <MaterialCommunityIcons name="menu" color={'#fd7175'} size={20} />
          </Animated.View>
        </TouchableWithoutFeedback>
      )}

      <Animated.View style={[styles.leftMenuContainer, estiloAnimacionAbrir]}>
        <Drawer.CollapsedItem
          icon="close-circle-outline"
          label="Cerrar"
          onPress={handleMenu}
        />
        <View style={styles.leftMenuItemsContainer}>
          <Drawer.CollapsedItem
            icon="information-outline"
            label="Sobre el club"
            style={styles.leftMenuItem}
            onPress={() => navigation.navigate('Espacio')}
          />
          <Drawer.CollapsedItem
            icon="forum-outline"
            label="Foro"
            style={styles.leftMenuItem}
            onPress={() => navigation.navigate('Foro')}
          />
          <Drawer.CollapsedItem
            icon="chat-outline"
            label="Chat"
            style={styles.leftMenuItem}
            onPress={() => navigation.navigate('Chat')}
          />
          <Drawer.CollapsedItem
            icon="home-outline"
            label="Espacios"
            style={styles.leftMenuItem}
            onPress={() => navigation.navigate('Dashboard')}
          />
        </View>
        <Drawer.CollapsedItem
          icon="heart-broken-outline"
          label="Dejar de seguir"
          style={styles.leftMenuItem}
          onPress={handleDejarEspacio}
        />
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  leftMenuContainer: {
    position: 'absolute',
    width: '20%',
    height: '100%',
    paddingVertical: 20,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowRadius: 10,
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    elevation: 5,
    zIndex: 1,
    justifyContent: 'space-between',
  },
  leftMenuItemsContainer: {},
  leftMenuItem: {},
  botonMenu: {
    position: 'absolute',
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    borderColor: '#fd7175',
    backgroundColor: '#181318',
    borderWidth: 1,
    top: 15,
    left: 15,
    zIndex: 2,
  },
});

export default LeftMenu;
