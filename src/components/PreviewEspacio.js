/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {dateFormat} from '../helpers/gestorFechas';
import useEspacio from '../hooks/useEspacio';

import {
  View,
  Text,
  StyleSheet,
  Pressable 
} from 'react-native';
import {
  Card,
  Title,
  Avatar,
} from 'react-native-paper';

const PreviewEspacio = ({navigation, espacio}) => {
  const {
    _id,
    esp_nombre,
    createdAt,
    esp_seguidores,
    esp_administrador,
    esp_img_portada,
  } = espacio;

  const {obtenerEspacio} = useEspacio();

  const LeftContent = ({...props}) => {
    return (
      <Avatar.Image
        size={50}
        source={{uri: esp_administrador.usu_perfil_img}}
      />
    );
  };

  const RightContent = ({...props}) => {
    return (
      <View style={{paddingHorizontal: 10}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}>
          <Text>{esp_seguidores.length}</Text>
          <MaterialCommunityIcons
            name="heart-outline"
            color={'red'}
            size={20}
          />
        </View>
        <Text>Creado el {dateFormat(createdAt)}</Text>
      </View>
    );
  };

  const handleEspacio = async () => {
    obtenerEspacio(_id);
    navigation.navigate('Espacio');
  };

  return (
    <View style={{marginBottom: 10}}>
      <Card>
        <Pressable  onPress={handleEspacio}>
          <Card.Cover
            style={styles.cardImage}
            source={{
              uri: esp_img_portada,
            }}
          />
        </Pressable >
        <Card.Content>
          <Title>{esp_nombre}</Title>
        </Card.Content>
        <Card.Title
          subtitle={esp_administrador.usu_nombre}
          left={LeftContent}
          right={RightContent}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  cardImage: {
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
});

export default PreviewEspacio;
