import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {TextInput, Button, ActivityIndicator} from 'react-native-paper';
import LeftMenu from './LeftMenu';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useForo from '../hooks/useForo';
import DocumentPicker from 'react-native-document-picker';

const Cabecera = ({titulo, icono, color, func, lm=true}) => {
  return (
    <>
    {lm &&
      <LeftMenu />
    }
      <View style={styles.cabecera}>
        <Text style={styles.textoCabecera}>{titulo}</Text>
        {func && (
          <TouchableOpacity onPress={func}>
            <View style={[styles.icon, {backgroundColor: color}]}>
              <MaterialCommunityIcons name={icono} color={'white'} size={20} />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  cabecera: {
    marginTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#b3b3b3ff',
    marginBottom: 10,
  },
  textoCabecera: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 100,
    position: 'absolute',
    top: -30,
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Cabecera;
