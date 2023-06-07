import {URL} from '../constants';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import store, {RootState} from '../../redux/store';

export const MethodType = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export const getURL = async () => {
  let result: any = await fetch(URL);
  result = await result.json();
  if (result.success) {
    result = __DEV__ ? result?.data?.dev_url : result?.data?.url;
    return result;
  }
};

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
    const state: RootState = store.baseStore.getState();
    const options: any = {
      method: type,
      baseURL: state.url,
      url: `api/${alias}`,
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
    axios(options)
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
  const state: RootState = store.baseStore.getState();
  return axios.get(`${state.url}sanctum/csrf-cookie`).catch(error => {
    console.log(error);
    return '';
  });
};
