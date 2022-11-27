import React, {createContext, useState} from 'react';

const AlertaContext = createContext();

const AlertaProvider = ({ children} ) => {
  const [visible, setVisible] = useState(false);

  const mostrarAlerta = () => { setVisible(true); };
  const ocultarAlerta = () => { setVisible(false); };

  return (
    <AlertaContext.Provider
      value={{
        visible,
        mostrarAlerta,
        ocultarAlerta,
      }}>
      {children}
    </AlertaContext.Provider>
  );
};

export { AlertaProvider };

export default AlertaContext;
