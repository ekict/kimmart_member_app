import {fetchAPI, MethodType} from '.';
import {ADD_MEMBER} from '../constants';

export const postMember: any = async (data: any) => {
  var formdata = new FormData();
  if (data.image === null) {
    formdata.append('image', null);
  } else {
    let is_update = true;
    if (data.image === undefined) {
      is_update = false;
    }
    if (is_update) {
      formdata.append('image', {
        uri: data.image.uri,
        name: data.image.fileName,
        type: data.image.type,
        data: data.image.base64,
      });
    }
  }

  formdata.append('name', data.name);
  formdata.append('phone', data.phone);
  formdata.append('email', data.email);
  const result = await fetchAPI(MethodType.POST, ADD_MEMBER, {}, formdata);
  return result;
};
