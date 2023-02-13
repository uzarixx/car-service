import React, { FC } from 'react';
import styles from './About.module.scss';


const faqArray = [
  {
    title: 'Я хочу придбати авто як це мені допоможе?',
    list: [
      { text: 'Ви можете швидко створити оголошення, та отримувати telegram-повідомлення.' },
      { text: 'Ви завжди можете відсортувати за містом підбирача, та знайти найкращого для вас.' },
    ],
  },
  {
    title: 'Я хочу допомогти знайти авто.',
    list: [
      { text: 'Ви завжди можете обрати з яким авто ви хочете працювати, та шукати його.' },
      { text: 'Всі оголошеня модеруются, тому ви будете завжди працювати з перевіреними оголошеннями.' },
    ],
  },
  {
    title: 'Чому саме цей сервіс?',
    list: [
      { text: 'Всі користувачи модеруются, та перевіріяются справжніми людьми.' },
      { text: 'Швидка та зручна реєстрація, та веріфікація.' },
      { text: 'Зручний telegram-бот для повідомлень, який ви можете вимкнути в будь-який момент.' },
    ],
  },
];


const About: FC = () => {
  return (
    <div className={styles.aboutWrapper}>
      <h2>Про наш сервіс</h2>
      {faqArray.map((el, i) =>
        <div className={styles.aboutContainer} key={i}
             style={{ alignItems: `flex-${i % 2 === 0 ? 'start' : 'end'}` }}>
          <h3>{el.title}</h3>
          <ul>
            {el.list.map((el, i) =>
              <li key={i}>{el.text}</li>,
            )}
          </ul>
        </div>,
      )}
    </div>
  );
};

export default About;