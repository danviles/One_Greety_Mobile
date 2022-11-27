import React, { useContext } from 'react';
import AlertaContext from '../context/AlertaContext';

const useAlerta = () => {
  return useContext(AlertaContext);
};

export default useAlerta;
