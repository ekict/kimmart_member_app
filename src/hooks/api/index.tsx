import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

export const MethodType = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export const URL = {
  prod: 'https://dev.ektecno.com',
  dev: 'https://dev.ektecno.com',
};

export const server = __DEV__ ? URL.dev : URL.prod;

// export const server = URL.dev;

export const API = axios.create({
  baseURL: `${server}/api/`,
});

// API.defaults.withCredentials = true;

export function fetchAPI(
  type: string,
  alias: string,
  params: any = {},
  data: any = {},
  manual_token: any = null,
) {
  const controller = new AbortController();
  return new Promise<any>(async resolve => {
    let cookie = await getCookie();
    let token: any = await EncryptedStorage.getItem('@token');

    const options: any = {
      method: type,
      url: alias,
      headers: {
        Authorization: manual_token
          ? `Bearer ${manual_token}`
          : token
          ? `Bearer ${token}`
          : '',
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data;',
        'X-CSRF-TOKEN': cookie,
      },
      data,
      params,
      signal: controller.signal,
    };
    API(options)
      .then(function (response) {
        resolve(response.data);
      })
      .catch(error => {
        resolve(error);
      });
  }).catch(error => {
    console.log(error);
    controller.abort();
  });
}

const getCookie = async () => {
  return axios.get(`${server}/sanctum/csrf-cookie`).catch(error => {
    console.log(error);
    return '';
  });
};
