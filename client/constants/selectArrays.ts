export const PostNewAdCarType = [
  {
    title: 'Паливо',
    name: 'carGas',
    options: [
      { title: '' },
      { title: 'Бензин' },
      { title: 'Дизель' },
      { title: 'Газ' },
      { title: 'Газ / Бензин' },
      { title: 'Гібрид' },
      { title: 'Електро' },
    ],
  },
  {
    title: 'Тип кузова',
    name: 'carType',
    options: [
      { title: '' },
      { title: 'Кабріолет' },
      { title: 'Пікап' },
      { title: 'Купе' },
      { title: 'Універсал' },
      { title: 'Хетчбек' },
      { title: 'Мінівен' },
      { title: 'Позашляховик / Кроссовер' },
      { title: 'Седан' },
      { title: 'Інший' },
      { title: 'Легковий фургон (до 1,5 т)' },
      { title: 'Ліфтбек' },
      { title: 'Лімузин' },
    ],
  },
  {
    title: 'Коробка передач',
    name: 'carTransmission',
    options: [
      { title: '' },
      { title: 'Ручна / Механіка'},
      { title: 'Автомат' },
      { title: 'Типтронік' },
      { title: 'Робот' },
      { title: 'Варіатор'},
    ],
  },
  {
    title: 'Тип приводу',
    name: 'carDrive',
    options: [
      { title: '' },
      { title: 'Повний' },
      { title: 'Передній' },
      { title: 'Задній' },
    ],
  },
];


export const CourseArray = {
  title: 'Курс',
  name: 'currency',
  options: [
    { title: '$' },
    { title: '€' },
    { title: '₴' },
  ],
};


export const ExperienceArray = {
  title: 'Кількість досвіду',
  name: 'experience',
  options: [
    {title: ''},
    {title: 'Меньш ніж 1 рік'},
    {title: '1-2 роки'},
    {title: '3-4 роки'},
    {title: '5-6 років'},
    {title: '6-7 років'},
    {title: '8-9 років'},
    {title: 'Більш ніж 10 років'},
  ]
}