import React, { FC, useEffect, useState } from 'react';
import MessagesComponentDetail from '../../components/messages/DetailComponent';
import Layout from '../../components/ui/layout/Layout';
import chatService from '../../service/chatService';
import authServices from '../../service/authService';
import { useRouter } from 'next/router';


const MessagesDetail: FC = () => {
  const router = useRouter();
  const chatId: any = router.query.id;
  const [chats, setChats] = useState([]);
  const [authUser, setAuthUser] = useState(null);
  const [chatData, setChatData] = useState([]);
  const getAuthUser = async () => {
    const { data } = await authServices.getUserData();
    setAuthUser(data);
  };
  const getChats = async () => {
    const { data } = await chatService.getChats();
    setChats(data);
  };
  const getChatById = async () => {
    const { data } = await chatService.getChatData(chatId);
    setChatData(data);
  };
  useEffect(() => {
    getChats();
    getAuthUser();
    chatId && getChatById();
  }, [chatId]);
  return (
    <Layout>
      <MessagesComponentDetail chats={chats} authUser={authUser} chatData={chatData} />
    </Layout>
  );
};

export default MessagesDetail;