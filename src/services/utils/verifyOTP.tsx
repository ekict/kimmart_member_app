import base64 from 'react-native-base64'
const key = {
  sid:'VA696224b882519d983b8c497fc14bf4cc',
  username:'SKe7f5fe9a2323ff46e20f2aae969d33af',
  password:'nrJWp4TY2g2MwX95aeTMlPWsFsr2Qzds'
}
export const BASE_URL =
  `https://verify.twilio.com/v2/Services`;

export const sendSmsVerification = async (phoneNumber: any) => {
  try {
    var formdata = new FormData();
    formdata.append('To', phoneNumber);
    formdata.append('Channel', 'sms');

    const response = await fetch(`${BASE_URL}/${key.sid}/Verifications?`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data;',
        'Authorization':`Basic ${base64.encode(`${key.username}:${key.password}`)}`
      },
      body:formdata
    });
    const json = await response.json();
    return json?.status ? json : null;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const checkVerification = async (phoneNumber: any, code: any,verify:any) => {
  try {
    var formdata = new FormData();
    formdata.append('To', phoneNumber);
    formdata.append('Code', code);

    const response = await fetch(`${BASE_URL}/${key?.sid}/VerificationCheck?`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data;',
        'Authorization':`Basic ${base64.encode(`${key.username}:${key.password}`)}`
      },
      body:formdata
    });

    const json = await response.json();
    return json?.status == 'approved';
  } catch (error) {
    console.error(error);
    return false;
  }
};
