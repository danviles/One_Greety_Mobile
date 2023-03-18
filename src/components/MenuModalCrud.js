import React, {
  useState,
  useRef,
  useMemo,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useTheme} from 'react-native-paper';
import useForo from '../hooks/useForo';
import {useNavigation} from '@react-navigation/native';

const MenuModalCrud = ({}) => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const {post, destacarPost, eliminarPost, esCreador} = useForo();

  return (
    <View style={styles.modalContainer}>
      <TouchableOpacity onPress={() => destacarPost(post._id)}>
        {!esCreador && (
          <View style={styles.modalOption}>
            <MaterialCommunityIcons
              name="star-outline"
              color={colors.amarillo}
              size={30}
            />
            {post.post_tags ? (
              <Text style={styles.modalOptionText}>
                {post.post_tags.includes('Destacado')
                  ? 'No Destacar'
                  : 'Destacar'}
              </Text>
            ) : (
              <Text style={styles.modalOptionText}>Destacar</Text>
            )}
          </View>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('CrearPost')}>
        <View style={styles.modalOption}>
          <MaterialCommunityIcons
            name="pencil-outline"
            color={colors.verde}
            size={30}
          />
          <Text style={styles.modalOptionText}>Editar</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => eliminarPost(post._id)}>
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

export default MenuModalCrud;
