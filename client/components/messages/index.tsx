import React, { FC } from 'react';
import styles from './Messages.module.scss';
import MessagesUsers from './messagesUsers/MessagesUsers';
import EmptyIcon from '../ui/icons/EmptyIcon';
interface props {
  chats: any ;
}

const MessagesComponent: FC<props> = ({ chats }) => {

  return (
    <div className={styles.chatWrapper}>
      <MessagesUsers chatsData={chats} />
      <div className={styles.notSelectedChat}>
        <EmptyIcon/>
        <h3>Будь-ласка, оберіть чат</h3>
      </div>
    </div>
  );
};

export default MessagesComponent;
