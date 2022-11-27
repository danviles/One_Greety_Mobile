import React from 'react';
import {View, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import {Button} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const ImagenPicker = () => {

  return (
    <>
      <View style={styles.containerPicker}>
        <View>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="close-circle-outline"
              size={50}
              color={'gray'}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <TouchableOpacity>
            <MaterialCommunityIcons name="camera" size={60} color={'#fff'} />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="folder-image"
              size={60}
              color={'#fff'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#181318',
    width: '100%',
    paddingHorizontal: 60,
    paddingVertical: 20,
  },
  containerPicker: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ImagenPicker;
