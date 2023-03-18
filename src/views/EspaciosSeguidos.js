import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Cabecera from '../components/Cabecera';
import useAuth from '../hooks/useAuth';
import PreviewEspacioPerfil from '../components/PreviewEspacioPerfil';
import { ActivityIndicator } from 'react-native-paper';

const EspaciosSeguidos = () => {
  const {auth, cargando, obtenerPerfilUsuario, perfilUsuario} = useAuth();

  useEffect(() => {
    obtenerPerfilUsuario(auth._id);
  }, []);

  if (cargando) {
    return (
      <ActivityIndicator animating={true} color={'#be2e4a'} style={{flex: 1}} />
    );
  }
  return (
    <>
      <Cabecera lm={false} titulo={'Clubes seguidos'}/>
      <View style={styles.contenedorEspacios}>
        <ScrollView>
          {perfilUsuario.usu_espacios ? (
            perfilUsuario.usu_espacios.map(espacio => (
                <PreviewEspacioPerfil key={espacio._id} espacio={espacio} />
            ))
          ) : (
            <Text>No hay espacios seguidos</Text>
          )}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  contenedorEspacios: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  }
});

export default EspaciosSeguidos;
