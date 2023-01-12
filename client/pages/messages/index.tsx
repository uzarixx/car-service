import React, { FC, useEffect } from 'react';
import Layout from '../../components/ui/layout/Layout';
import MessagesComponent from '../../components/messages';
import PreloaderDots from '../../components/ui/preloaders/PreloaderDots';
import {
  $data,
  $loadingData,
  getChats,
} from '../../store/chatData';
import { useStore } from 'effector-react';


const Messages: FC = () => {
  const chats = useStore($data);
  const isLoading = useStore($loadingData);

  useEffect(() => {
    getChats();
  }, []);


  return (
    <Layout>
      {isLoading ? <PreloaderDots /> : <MessagesComponent chats={chats} />}
    </Layout>
  );
};

export default Messages;