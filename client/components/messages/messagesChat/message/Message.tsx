import React, { FC } from 'react';
import styles from './Message.module.scss';
import UserIcon from '../../../ui/icons/UserIcon';

interface props {
  authUserId: number;
  senderId: number;
  message: string;
  chatData: { id: number, userName: string, photo: string }[];
}

const Message: FC<props> = ({ authUserId, senderId, chatData, message }) => {
  return (
    <>
      {authUserId !== senderId &&
        <div className={styles.avatar}>{chatData.map((el) =>
          <React.Fragment key={el.id}>
            {el.photo ? <img src={el.photo} alt={'user-avatar'} /> :
              <UserIcon />
            }
            <span>{el.userName}</span>
          </React.Fragment>,
        )}
        </div>}
      <p className={styles.messageBlock}>
        {message}
      </p>
    </>
  );
};

export default Message;
