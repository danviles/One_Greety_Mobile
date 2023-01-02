import React, { useContext } from 'react';
import ForoContext from '../context/ForoContext';

const useForo = () => {
  return useContext(ForoContext);
};

export default useForo;
