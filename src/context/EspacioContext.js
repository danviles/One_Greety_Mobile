import React, {createContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import clienteAxios from '../config/clienteAxios';

const EspacioContext = createContext();

const EspacioProvider = ({children}) => {
  const [espacios, setEspacios] = useState([]);
  const [espacio, setEspacio] = useState(null);
  const [cargando, setCargando] = useState(false);

  const obtenerEspacios = async () => {
    setCargando(true);
    try {
      const {data} = await clienteAxios.get('/espacios/todos');
      setEspacios(data);
    } catch (error) {
      setCargando(false);
      console.log(error);
    }
    setCargando(false);
  };

  const obtenerEspacio = async (id) => {
    setCargando(true);
    try {
      const {data} = await clienteAxios.get(`/espacios/unico/${id}`);
      setEspacio(data);
    } catch (error) {
      setCargando(false);
      console.log(error);
    }
    setCargando(false);
  };

  const agregarSeguidor = async (id) => {
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
      await clienteAxios(`/espacios/seguidores/${id}`, config);
      obtenerEspacio(id);
    } catch (error) {
      setCargando(false);
      console.log(error.response.data.msg);
    }
    setCargando(false);
  };

  const agregarPeticion = async (id) => {
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
      await clienteAxios(`/espacios/peticiones/${id}`, config);
      obtenerEspacio(id)
    } catch (error) {
      setCargando(false);
      console.log(error);
    }
    setCargando(false);
  };

  return (
    <EspacioContext.Provider
      value={{
        espacios,
        espacio,
        cargando,
        obtenerEspacios,
        obtenerEspacio,
        agregarSeguidor,
        agregarPeticion,
      }}>
      {children}
    </EspacioContext.Provider>
  );
};

export {EspacioProvider};

export default EspacioContext;
