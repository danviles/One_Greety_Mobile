import axios from 'axios';

const clienteAxios = axios.create({
  // baseURL: 'https://quiet-eyrie-56964.herokuapp.com/api',
  baseURL: 'https://one-greety-backend.onrender.com/api',

});

export default clienteAxios;
