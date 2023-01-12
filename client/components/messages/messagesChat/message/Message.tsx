import React, { FC } from 'react';
import styles from './Message.module.scss';
import UserIcon from '../../../ui/icons/UserIcon';
import { isURL } from '../../../../utils/isUrl';

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
        {isURL(message) ? <a href={message} target='_blank' rel='noreferrer'>{message}</a> : `${ message }`}
      </p>
    </>
  );
};

export default Message;
