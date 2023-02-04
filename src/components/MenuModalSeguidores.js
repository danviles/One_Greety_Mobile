import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useTheme, Avatar} from 'react-native-paper';
import useForo from '../hooks/useForo';
import {useNavigation} from '@react-navigation/native';

const MenuModalSeguidores = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const {post, destacarPost, eliminarPost} = useForo();

  const handlePerfilUsuario = () => {
    const id = post.post_creador._id;
    navigation.navigate('PerfilUsuario', {id});
  };

  return (
    <View style={styles.modalContainer}>
      <TouchableOpacity onPress={handlePerfilUsuario}>
        <View style={styles.modalOption}>
          <Avatar.Image size={50} source={{uri: post.post_creador.usu_perfil_img}} />
          <Text style={styles.modalOptionText}>Visitar Perfil</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default MenuModalSeguidores;
