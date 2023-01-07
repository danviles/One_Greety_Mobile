import React, {createContext, useState} from 'react';
import {ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import clienteAxios from '../config/clienteAxios';

const ForoContext = createContext();

const ForoProvider = ({ children} ) => {

  const [postBorrador, setPostBorrador] = useState({});
  const [postCargando, setPostCargando] = useState(false);


  const crearPost = async (post, img) => {
    setPostCargando(true);

    const token = await AsyncStorage.getItem('Token');
    if (!token) {
      setPostCargando(false);
      ToastAndroid.show('Token no valido, inicia sesión', ToastAndroid.SHORT);
      return;
    }

    if (img !== undefined) {

      let formData = new FormData();
      formData.append('file', img);
      formData.append('imgId', post.post_media_id);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const imageData = await clienteAxios.post('/files', formData, config);
        post.post_media_img = imageData.data.url;
        post.post_media_id = imageData.data.publicId;
      } catch (error) {
        ToastAndroid.show('Hubo un error, inténtelo mas tarde.', ToastAndroid.SHORT);
        setPostCargando(false);
        return;
      }
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };


    try {
      const {data} = await clienteAxios.post('/foros/', post, config);
      ToastAndroid.show(data.message, ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show('Hubo un error, inténtelo mas tarde.', ToastAndroid.SHORT);
    }
    setPostCargando(false);
  };

  const crearComentario = async (resp, postId, img) => {
    setPostCargando(true);

    const token = await AsyncStorage.getItem('Token');
    if (!token) {
      setPostCargando(false);
      ToastAndroid.show('Token no valido, inicia sesión', ToastAndroid.SHORT);
      return;
    }

    if (img !== undefined) {

      let formData = new FormData();
      formData.append('file', img);
      formData.append('imgId', resp.res_media_id);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const imageData = await clienteAxios.post('/files', formData, config);
        resp.res_media_img = imageData.data.url;
        resp.res_media_id = imageData.data.publicId;
      } catch (error) {
        ToastAndroid.show('Hubo un error, inténtelo mas tarde.', ToastAndroid.SHORT);
        setPostCargando(false);
        return;
      }
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };


    console.log(postId)
    try {
      const {data} = await clienteAxios.post(`/foros/${postId}/respuestas`, resp, config);
    } catch (error) {
      // mostrar error del servidor
      ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
    }


    setPostCargando(false);
  };

  return (
    <ForoContext.Provider
      value={{
        postBorrador,
        postCargando,
        setPostBorrador,
        crearPost,
        crearComentario,
      }}>
      {children}
    </ForoContext.Provider>
  );
};

export { ForoProvider };

export default ForoContext;
