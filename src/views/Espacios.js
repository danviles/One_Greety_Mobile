/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useCallback} from 'react';
import useAuth from '../hooks/useAuth';
import useEspacio from '../hooks/useEspacio';
import PreviewEspacio from '../components/PreviewEspacio';
import Background from '../components/Backgorund';

import {View, StyleSheet, ScrollView, RefreshControl, Dimensions} from 'react-native';
import {Searchbar} from 'react-native-paper';

const Espacios = ({navigation}) => {
  const {auth, hacerLogout, cargando, obtenerPerfil} = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const {espacios, obtenerEspacios} = useEspacio();
  const [refreshing, setRefreshing] = useState(false);

  const onChangeSearch = query => setSearchQuery(query);

  const filter =
    searchQuery === ''
      ? espacios
      : espacios
          .filter(espacio =>
            espacio.esp_nombre
              .toLowerCase()
              .includes(searchQuery.toLowerCase()),
          )
          .concat(
            espacios.filter(espacio =>
              espacio.esp_administrador.usu_nombre
                .toLowerCase()
                .includes(searchQuery.toLowerCase()),
            ),
          )
          .reduce((acc, item) => {
            if (!acc.includes(item)) {
              acc.push(item);
            }
            return acc;
          }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    obtenerPerfil();
    obtenerEspacios();
    setRefreshing(false);
  }, []);

  return (
    <>
      <Background>
        <View>
          <Searchbar
            placeholder="Buscar espacio, creador..."
            style={styles.buscador}
            onChangeText={text => onChangeSearch(text)}
            value={searchQuery}
          />
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View style={styles.espacios}>
              {/* {espacios.length > 0 &&
            espacios.map(espacio => (
              <PreviewEspacio key={espacio._id} navigation={navigation} espacio={espacio} />
            ))} */}
              {filter.length > 0 &&
                filter.map(espacio => (
                  <PreviewEspacio
                    key={espacio._id}
                    navigation={navigation}
                    espacio={espacio}
                  />
                ))}
            </View>
          </ScrollView>
        </View>
      </Background>
    </>
  );
};

const styles = StyleSheet.create({
  buscador: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 100,
  },
  espacios: {
    paddingHorizontal: 10,
    marginBottom: 150,
  },
  cardImage: {
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
});

export default Espacios;
