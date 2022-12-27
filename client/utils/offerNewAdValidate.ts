import * as yup from 'yup';

export const offerNewAdValidate = yup.object().shape({
  title: yup.string().min(15, 'Назва оголошення не може бути меньш ніж 15 символів').max(60, 'Назва оголошення не може бути більш ніж 60 символів'),
  carBrand: yup.string().when('carBrand', (val, _) => {
    if (val?.length > 0) return yup.string().min(2, 'Оберіть марку');
    else return yup.string().min(2, 'Оберіть марку');
  }),
  carModel: yup.string().matches(/^[\s/a-zA-Z0-9]+$/i, 'Введіть дійсну модель').max(40, 'Назва моделі не може бути більш ніж 40 символів'),
  carForces: yup.string().when('carForces', (val, _) => {
    if (val?.length > 0) return yup.string().matches(/^\d+$/, 'Дозволені лише цифри').max(4, 'Введіть дійсне число');
    else return yup.string().notRequired();
  }),
  carYear: yup.string().when('carYear', (val, _) => {
    if (val?.length > 0) return yup.string().matches(/^\d+$/, 'Дозволені лише цифри').max(4, 'Введіть дійсне число');
    else return yup.string().notRequired();
  }),
  carLiters: yup.string().when('carLiters', (val, _) => {
    if (val?.length > 0) return yup.string().matches(/^(([1-9]\d*)|0)(\.\d+)?$/, 'Дозволені лише цифри').max(4, 'Введіть дійсне число');
    else return yup.string().notRequired();
  }),
  description: yup.string().min(80, 'Опис повинен бути не коротшим за 80 символів').max(9000, 'Опис повинен бути не більш ніж 9000 символів'),
  carType: yup.string().min(1, 'Оберіть тип авто'),
  carTransmission: yup.string().min(1, 'Оберіть тип коробки передач'),
  carGas: yup.string().min(1, 'Оберіть тип палива'),
  carDrive: yup.string().min(1, 'Оберіть тип приводу'),
  budget: yup.string().min(3, 'Введіть дійсну суму').max(20, 'Введіть дійсну суму').matches(/^\d+$/, 'Дозволені лише цифри'),
  budgetService: yup.string().min(3, 'Введіть дійсну суму').max(20, 'Введіть дійсну суму').matches(/^\d+$/, 'Дозволені лише цифри'),
  phoneNumber: yup.string().matches(/^[\+]?3?[\s]?8?[\s]?\(?0\d{2}?\)?[\s]?\d{3}[\s|-]?\d{2}[\s|-]?\d{2}$/, 'Введіть коректний номер телефону'),
  city: yup.string().matches(/[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ]/g, 'Введіть дійсне місто'),
}, [
  ['carForces', 'carForces'],
  ['carLiters', 'carLiters'],
  ['carBrand', 'carBrand'],
  ['carYear', 'carYear'],
]);
