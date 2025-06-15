
import axios from 'axios'
export const api = axios.create({
    baseURL: 'http://localhost:8080', // Atualize para a URL do seu back-end
  });