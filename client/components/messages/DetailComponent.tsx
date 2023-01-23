import React, { FC } from 'react';
import styles from './Messages.module.scss';
import MessagesUsers from './messagesUsers/MessagesUsers';
import MessagesChat from './messagesChat/MessagesChat';
import { chatType } from '@/constants/type';
import PreloaderDots from '../ui/preloaders/PreloaderDots';

interface props {
  chats: any | chatType;
  chatData: any | chatType;
  isLoading: any | boolean;
}

const MessagesComponentDetail: FC<props> = ({
  chats,
  chatData,
  isLoading,
}) => {
  return (
    <div className={styles.chatWrapper}>
      <MessagesUsers chatsData={chats} />
      {isLoading ? <PreloaderDots /> : <MessagesChat chatData={chatData} />}
    </div>
  );
};

export default MessagesComponentDetail;
