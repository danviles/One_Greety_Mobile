import React, {createContext, useState} from 'react';
import clienteAxios from '../config/clienteAxios';

const EspacioContext = createContext();

const EspacioProvider = ({children}) => {
  const [espacios, setEspacios] = useState([]);
  const [espacio, setEspacio] = useState(null);
  const [cargando, setCargando] = useState(false);

  const obtenerEspacios = async () => {
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

  return (
    <EspacioContext.Provider
      value={{
        espacios,
        espacio,
        cargando,
        obtenerEspacios,
        obtenerEspacio
      }}>
      {children}
    </EspacioContext.Provider>
  );
};

export {EspacioProvider};

export default EspacioContext;
