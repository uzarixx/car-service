import React, { FC } from 'react';
import UserIcon from '../../../ui/icons/UserIcon';
import styles from './MessageTyping.module.scss';

interface messagesProps {
  chatData: { id: number, userName: string, photo: string }[];
}

const MessageTyping: FC<messagesProps> = ({ chatData }) => {
  return (
    <>
      {chatData.map((el, i) =>
        <div className={styles.isTyping} key={i}>
          {el.photo ? <img src={el.photo} alt={'user-avatar'} className={styles.avatar}/> : <UserIcon />}
          <img
            src={'https://media.tenor.com/y29vJ0OqaQ4AAAAj/typing-texting.gif'}
            alt={'typing-chat'} width={45} height={40} />
        </div>,
      )}
    </>
  );
};
export default MessageTyping;