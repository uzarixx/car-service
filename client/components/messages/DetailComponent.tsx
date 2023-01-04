import React, { FC } from 'react';
import styles from './Messages.module.scss';
import MessagesUsers from './messagesUsers/MessagesUsers';
import MessagesChat from './messagesChat/MessagesChat';
import { chatType, userType } from '../../constants/type';

interface props {
  chats: any | chatType;
  authUser: any | userType;
  chatData: any | chatType;
}

const MessagesComponentDetail: FC<props> = ({ chats, authUser, chatData }) => {
  return (
    <div className={styles.chatWrapper}>
      <MessagesUsers chatsData={chats} />
      <MessagesChat authUser={authUser} chatData={chatData} />
    </div>
  );
};

export default MessagesComponentDetail;
