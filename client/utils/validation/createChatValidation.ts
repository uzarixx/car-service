import * as yup from 'yup';

export const createChatValidation = yup.object().shape({
  message: yup.string().min(10, 'Мінімальна длина повідомлення 10 символів').max(200, 'Максимальна длина повідомлення 200 символів'),
});
