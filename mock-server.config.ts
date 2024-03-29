import type {MockServerConfig} from 'mock-config-server';

export const mockServerConfig: MockServerConfig = {
  rest: {
    baseUrl: '/api',
    configs: [
      {
        path: '/signin',
        method: 'post',
        routes: [
          {
            data: {error: 'invalid_request'},
            interceptors: {
              response: (data, {setStatusCode}) => {
                setStatusCode(400);
                return data;
              },
            },
          },
          {
            data: {error: 'invalid_credentials'},
            entities: {
              body: {
                email: 'bartenevdmitriy@bk.ru',
              },
            },
            interceptors: {
              response: (data, {setStatusCode}) => {
                setStatusCode(403);
                return data;
              },
            },
          },
          {
            data: {email: 'bartenevdmitriy@bk.ru', username: 'dmitriy'},
            entities: {
              body: {
                email: 'bartenevdmitriy@bk.ru',
                password: 'qwerty123',
              },
            },
            interceptors: {
              response: (data, {appendHeader}) => {
                appendHeader('Set-Cookie', 'token=auth-user-token;Max-Age=3600;Path=/;HttpOnly');
                return data;
              },
            },
          },
        ],
      },
      {
        path: '/signup',
        method: 'post',
        routes: [
          {
            entities: {
              body: {
                username: 'dmitriy',
              },
            },
            data: {error: 'user_exist'},
            interceptors: {
              response: (data, {setStatusCode}) => {
                setStatusCode(403);
                return data;
              },
            },
          },
          {
            data: {success: true},
            interceptors: {
              response: (data, {appendHeader, request}) => {
                appendHeader('Set-Cookie', 'token=auth-user-token;Max-Age=3600;Path=/;HttpOnly');
                return {...request.body.email};
              },
            },
          },
        ],
      },
      {
        path: '/session',
        method: 'get',
        routes: [
          {
            data: {email: 'bartenevdmitriy@bk.ru', username: 'dmitriy'},
            interceptors: {
              response: (data, {request, setStatusCode}) => {
                if (request.headers.cookie === 'token=auth-user-token') return data;

                setStatusCode(401);
                return {error: 'unauthorized'};
              },
            },
          },
        ],
      },
      {
        path: '/confirm',
        method: 'post',
        routes: [
          {
            data: {email: 'bartenevdmitriy@bk.ru', username: 'dmitriy'},
            interceptors: {
              response: (data, {appendHeader}) => {
                appendHeader('Set-Cookie', 'token=auth-user-token;Max-Age=3600;Path=/;HttpOnly');
                return data;
              },
            },
          },
        ],
      },
      {
        path: '/reset-password',
        method: 'post',
        routes: [
          {
            data: {success: true},
            interceptors: {
              response: (data, {appendHeader}) => {
                appendHeader('Set-Cookie', 'token=auth-user-token');
                return data;
              },
            },
          },
        ],
      },
    ],
  },
};

export default mockServerConfig;
