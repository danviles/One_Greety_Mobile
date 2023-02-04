import React, {createContext, useEffect, useState} from 'react';
import {ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import clienteAxios from '../config/clienteAxios';
import useEspacio from '../hooks/useEspacio';
import useAuth from '../hooks/useAuth';

const ForoContext = createContext();

const ForoProvider = ({children}) => {
  const [postBorrador, setPostBorrador] = useState({});
  const [postCargando, setPostCargando] = useState(false);
  const [post, setPost] = useState({});
  const [esAdmin, setEsAdmin] = useState(false);
  const [esColaborador, setEsColaborador] = useState(false);
  const [esCreador, setEsCreador] = useState(false);
  const {espacio, setEspacio, obtenerEspacio} = useEspacio();
  const {auth} = useAuth();

  useEffect(() => {
    setPostBorrador({});
  }, [espacio]);

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
        ToastAndroid.show(
          'Hubo un error con la imagen, inténtelo mas tarde.',
          ToastAndroid.SHORT,
        );
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
      obtenerEspacio(espacio._id);
      ToastAndroid.show(data.message, ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show(
        'Hubo un error con el post, inténtelo mas tarde.',
        ToastAndroid.SHORT,
      );
    }
    setPost({});
    setPostCargando(false);
  };

  const crearComentario = async (resp, id, postId, img) => {
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
        ToastAndroid.show(
          'Hubo un error, inténtelo mas tarde.',
          ToastAndroid.SHORT,
        );
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
      const {data} = await clienteAxios.post(
        `/foros/${id}/respuestas`,
        resp,
        config,
      );
      await obtenerEspacio(espacio._id);
      await obtenerPost(postId);
    } catch (error) {
      // mostrar error del servidor
      ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
    }

    setPostCargando(false);
  };

  const destacarPost = async postId => {
    setPostCargando(true);

    const token = await AsyncStorage.getItem('Token');
    if (!token) {
      setPostCargando(false);
      ToastAndroid.show('Token no valido, inicia sesión', ToastAndroid.SHORT);
      return;
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const {data} = await clienteAxios(`/foros/${postId}/destacar`, config);
      obtenerEspacio(espacio._id);
      // ToastAndroid.show(data.message, ToastAndroid.SHORT);
    } catch (error) {
      // mostrar error del servidor
      ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
    }

    setPostCargando(false);
  };

  const eliminarPost = async postId => {
    setPostCargando(true);

    const token = await AsyncStorage.getItem('Token');
    if (!token) {
      setPostCargando(false);
      ToastAndroid.show('Token no valido, inicia sesión', ToastAndroid.SHORT);
      return;
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const {data} = await clienteAxios.delete(`/foros/${postId}`, config);
      obtenerEspacio(espacio._id);
      ToastAndroid.show(data.message, ToastAndroid.SHORT);
    } catch (error) {
      // mostrar error del servidor
      ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
    }

    setPostCargando(false);
  };

  const editarPost = async (actPost, img, postid) => {
    setPostCargando(true);

    const token = await AsyncStorage.getItem('Token');
    if (!token) {
      setPostCargando(false);
      ToastAndroid.show('Token no valido, inicia sesión', ToastAndroid.SHORT);
      return;
    }

    if (img !== undefined && img !== 'eliminar' && actPost.post_media_id === '') {
      console.log('entro a editar img');
      let formData = new FormData();
      formData.append('file', img);
      formData.append('imgId', actPost.post_media_id);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const imageData = await clienteAxios.post('/files', formData, config);
        actPost.post_media_img = imageData.data.url;
        actPost.post_media_id = imageData.data.publicId;
      } catch (error) {
        ToastAndroid.show(
          'Hubo un error con la imagen, inténtelo mas tarde.',
          ToastAndroid.SHORT,
        );
        setPostCargando(false);
        return;
      }
    } else if (img === 'eliminar') {
      console.log('entro a eliminar imagen')
      try {
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        };
        const imgData = {
          imgId: post.post_media_id,
          imgPath: post.post_media_img,
        }
        console.log('entra aqui', imgData);
        const imageData = await clienteAxios.post('/files/eliminar', imgData, config);
        actPost.post_media_img = '';
        actPost.post_media_id = '';
      } catch (error) {
        ToastAndroid.show(
          'Hubo un error con la imagen, inténtelo mas tarde.',
          ToastAndroid.SHORT,
        );
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
      const {data} = await clienteAxios.put(`/foros/${postid}`, actPost, config);
      obtenerEspacio(espacio._id);
      ToastAndroid.show(data.message, ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show(
        'Hubo un error con el post, inténtelo mas tarde',
        ToastAndroid.SHORT,
      );
    }
    setPostCargando(false);
  };

  const setRolUsuario = () => {
    setEsAdmin(false);
    setEsCreador(false);
    setEsColaborador(false);
    if (espacio.esp_administrador._id === auth._id) {
      console.log('es admin');
      setEsAdmin(true);
    }
    if (espacio.esp_colaboradores.includes(auth._id)) {
      console.log('es colaborador');
      setEsColaborador(true);
    }
    if(post._id) {
      if (post.post_creador._id === auth._id) {
        console.log('es creador');
        setEsCreador(true);
      }
    }
  };

  const obtenerPost = async postId => {
    setPostCargando(true);

    const token = await AsyncStorage.getItem('Token');
    if (!token) {
      setPostCargando(false);
      ToastAndroid.show('Token no valido, inicia sesión', ToastAndroid.SHORT);
      return;
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const {data} = await clienteAxios.get(`/foros/${postId}`, config);
      setPost(data.postExistente);
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
        post,
        esAdmin,
        esCreador,
        esColaborador,
        setPostBorrador,
        setPost,
        crearPost,
        crearComentario,
        destacarPost,
        eliminarPost,
        editarPost,
        setEsAdmin,
        setEsCreador,
        setEsColaborador,
        setRolUsuario,
        obtenerPost,
      }}>
      {children}
    </ForoContext.Provider>
  );
};

export {ForoProvider};

export default ForoContext;
