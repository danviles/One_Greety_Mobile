import axios from 'axios';

const clienteAxios = axios.create({
  // baseURL: 'https://quiet-eyrie-56964.herokuapp.com/api',
  baseURL: 'http://localhost:4000',

});

export default clienteAxios;
