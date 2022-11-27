import axios from 'axios';

const clienteAxios = axios.create({
  // baseURL: 'https://quiet-eyrie-56964.herokuapp.com/api',
  baseURL: 'https://onegreetybackend-production.up.railway.app/api',

});

export default clienteAxios;
