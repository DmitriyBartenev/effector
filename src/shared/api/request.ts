import axios from 'axios';
import {createEffect} from 'effector';

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
  baseURL: '/api',
  timeout: 1000,
  validateStatus: (status) => status >= 200 && status < 300,
});

interface Request {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: unknown;
}

export const requestFx = createEffect<Request, any>((request) => {
  return mockapi({
    method: request.method,
    url: request.path,
    data: request.body,
  })
    .then((response) => response.data)
    .catch((response) => Promise.reject(response.response.data));
});
