import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Cabecera from '../components/Cabecera';
import useAuth from '../hooks/useAuth';
import PreviewEspacioPerfil from '../components/PreviewEspacioPerfil';

const EspaciosSeguidos = () => {
  const {auth} = useAuth();
  return (
    <>
      <Cabecera lm={false} titulo={'Clubes seguidos'}/>
      <View style={styles.contenedorEspacios}>
        <ScrollView>
          {auth.usu_espacios ? (
            auth.usu_espacios.map(espacio => (
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
