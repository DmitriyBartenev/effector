import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.edamam.com/api/recipes/v2',
  timeout: 1000,
  params: {
    type: 'public',
    app_id: '1149329a',
    app_key: '076ca6efe90d483acbd153b9ced739b3',
  },
});

export const mockapi = axios.create({
  baseURL: 'http://localhost:31299/api',
  timeout: 1000,
});
