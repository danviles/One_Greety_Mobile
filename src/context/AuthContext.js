/* eslint-disable react-hooks/exhaustive-deps */
import React, {createContext, useState} from 'react';
import {ToastAndroid} from 'react-native';
import clienteAxios from '../config/clienteAxios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAlerta from '../hooks/useAlerta';

const AuthContext = createContext();

const AuthProvider = ({children, navigation}) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(false);
  const {mostrarAlerta} = useAlerta();

  const hacerLogin = async user => {
    const {usu_email, usu_password} = user;
    setCargando(true);
    try {
      const {data} = await clienteAxios.post('/usuarios/login', {
        usu_email,
        usu_password,
      });
      await AsyncStorage.setItem('Token', data.usu_token);
      setAuth(data);
    } catch (error) {
      ToastAndroid.show(error.response.data.msg, ToastAndroid.SHORT);
      setCargando(false);
    }
    setCargando(false);
  };

  const obtenerPerfil = async () => {
    setCargando(true);
    const token = await AsyncStorage.getItem('Token');
    if (!token) {
      setCargando(false);
      return;
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const {data} = await clienteAxios('/usuarios/perfil', config);
      setAuth(data);
    } catch (error) {
      setAuth({});
      ToastAndroid.show(error.response.data.msg, ToastAndroid.SHORT);
      setCargando(false);
    }
    setCargando(false);
  };

  const editarPerfil = async (usuario, img) => {
    setCargando(true);

    try {
      const token = await AsyncStorage.getItem('Token');
      if (!token) return;

      if (img !== undefined) {
        console.log(img)
        let formData = new FormData();
        formData.append('file', img);
        formData.append('imgId', usuario.usu_img_id);
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        };

        const imageData = await clienteAxios.put('/files', formData, config);
        usuario.usu_perfil_img = imageData.data.url;
        usuario.usu_img_id = imageData.data.publicId;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const {data} = await clienteAxios.put(
        `/usuarios/perfil/${auth._id}`,
        usuario,
        config,
      );

      setAuth(data.usuario);

    } catch (error) {
      setCargando(false);
      ToastAndroid.show(error.response.data.msg, ToastAndroid.SHORT);
    }
    setCargando(false);
  };


  const recuperarPassword = async usu_email => {
    setCargando(true);
    try {
      const {data} = await clienteAxios.post('/usuarios/recuperar-password', {
        usu_email,
      });
      mostrarAlerta();
    } catch (error) {
      setCargando(false);
      ToastAndroid.show(error.response.data.msg, ToastAndroid.SHORT);
    }
    setCargando(false);
  };

  const crearCuenta = async user => {
    console.log(user);
    setCargando(true);
    try {
      const {data} = await clienteAxios.post('/usuarios', user);
      mostrarAlerta();
      setCargando(false);
    } catch (error) {
      setCargando(false);
      ToastAndroid.show(error.response.data.msg, ToastAndroid.SHORT);
    }
    setCargando(false);
  };

  const hacerLogout = async () => {
    await AsyncStorage.removeItem('Token');
    setAuth({});
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        cargando,
        setAuth,
        hacerLogin,
        setCargando,
        obtenerPerfil,
        hacerLogout,
        recuperarPassword,
        crearCuenta,
        editarPerfil,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthProvider};

export default AuthContext;
