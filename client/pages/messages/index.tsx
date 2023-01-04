import React, { FC, useEffect, useState } from 'react';
import Layout from '../../components/ui/layout/Layout';
import MessagesComponent from '../../components/messages';
import chatService from '../../service/chatService';

const Messages: FC = () => {
  const [chats, setChats] = useState([])
  const getChats = async () => {
    const { data } = await chatService.getChats();
    setChats(data);
  };
  useEffect(() => {
    getChats();
  }, []);
  return (
    <Layout>
      <MessagesComponent chats={chats}/>
    </Layout>
  );
};

export default Messages;