import * as yup from 'yup';

export const resetPasswordValidate = yup.object().shape({
  email: yup.string().email('Ведіть правильну адресу').required('Поле обов\'язкове для заповнення'),
});


export const passwordsValidate = yup.object().shape({
  password: yup.string().min(3, 'Мінімальна длина паролю 3 символи').max(32, 'Максимальна длина паролю до 32 символів').required('Поле обов\'язкове для заповнення').oneOf([yup.ref('passwordRepeat')], 'Паролі мають бути однаковими'),
  passwordRepeat: yup.string().min(3, 'Мінімальна длина паролю 3 символи').max(32, 'Максимальна длина паролю до 32 символів').required('Поле обов\'язкове для заповнення').oneOf([yup.ref('password')], 'Паролі мають бути однаковими'),
});