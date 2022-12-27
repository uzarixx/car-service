import * as yup from 'yup';

export const accountSettingsValidate = yup.object().shape({
  userName: yup.string()
    .min(2, 'Мінімальна длина ім\'я повинна бути не меньш ніж 2 символи')
    .max(20, 'Максимальна длина ім\'я повинна бути не більш ніж 20 символів')
    .matches(/[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ]/g, 'Введіть дійсне ім\'я'),
  userLastName: yup.string()
    .min(2)
    .max(20)
    .matches(/[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ]/g, 'Введіть дійсне призвище'),
  email: yup.string().email('Ведіть правильну адресу').required('Поле обов\'язкове для заповнення'),
  city: yup.string().matches(/[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ]/g, 'Введіть дійсне місто'),
  phoneNumber: yup.string().matches(/^[\+]?3?[\s]?8?[\s]?\(?0\d{2}?\)?[\s]?\d{3}[\s|-]?\d{2}[\s|-]?\d{2}$/),
});
