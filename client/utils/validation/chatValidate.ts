import * as yup from 'yup';

export const chatValidate = yup.object().shape({
  send: yup.string().max(1000, 'Максимальна длина повідомлення 1000 символів').required('Введіть повідомлення'),
});