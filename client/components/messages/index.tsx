import React, { FC } from 'react';
import styles from './Messages.module.scss';
import MessagesUsers from './messagesUsers/MessagesUsers';
interface props {
  chats: any ;
}

const MessagesComponent: FC<props> = ({ chats }) => {

  return (
    <div className={styles.chatWrapper}>
      <MessagesUsers chatsData={chats} />
    </div>
  );
};

export default MessagesComponent;
