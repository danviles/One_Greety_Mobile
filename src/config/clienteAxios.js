import axios from 'axios';
import {BACKEND_URL} from '@env';

console.log(BACKEND_URL);
const clienteAxios = axios.create({
  // baseURL: 'https://one-greety-backend.onrender.com/api',
  baseURL: BACKEND_URL,
});

export default clienteAxios;
