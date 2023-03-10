import * as yup from 'yup';

export const login = yup.object().shape({
  email: yup.string().email('Ведіть правильну адресу').required('Поле обов\'язкове для заповнення'),
  password: yup.string().min(3, 'Мінімальна длина паролю 3 символи').max(32, 'Максимальна длина паролю до 32 символів').required('Поле обов\'язкове для заповнення'),
});

export const register = yup.object().shape({
  email: yup.string().email('Ведіть правильну адресу').required('Поле обов\'язкове для заповнення'),
  userName: yup.string()
    .min(2, 'Мінімальна длина ім\'я повинна бути не меньш ніж 2 символи')
    .max(20, 'Максимальна длина ім\'я повинна бути не більш ніж 20 символів')
    .matches(/[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ]/g, 'Введіть дійсне ім\'я'),
  password: yup.string().min(3, 'Мінімальна длина паролю 3 символи').max(32, 'Максимальна длина паролю до 32 символів').required('Поле обов\'язкове для заповнення').oneOf([yup.ref('passwordRepeat')], 'Паролі мають бути однаковими'),
  passwordRepeat: yup.string().min(3, 'Мінімальна длина паролю 3 символи').max(32, 'Максимальна длина паролю до 32 символів').required('Поле обов\'язкове для заповнення').oneOf([yup.ref('password')], 'Паролі мають бути однаковими'),
});


