import * as yup from 'yup';

export const LoginValue = {phone: ''};
export const LoginSchema = yup.object().shape({
  phone: yup
    .string()
    .min(9, JSON.stringify({name: 'error.least_characters', value1: '9'}))
    .required(
      JSON.stringify({name: 'error.required', value1: 'auth.phone_number'}),
    ),
});

export const profileSchema = yup.object().shape({
  fullName: yup
    .string()
    .required(
      JSON.stringify({name: 'error.required', value1: 'auth.full_name'}),
    ),
  email: yup
    .string()
    .email(JSON.stringify({name: 'error.email', value1: 'auth.email'})),
});
