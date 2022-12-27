import * as yup from 'yup';

export const portfolioAccountValidate = yup.object().shape({
  description: yup.string().min(80, 'Опис повинен бути не коротшим за 80 символів').max(9000, 'Опис повинен бути не більш ніж 9000 символів'),
  experience: yup.string().min(3, 'Оберіть пункт'),
});
