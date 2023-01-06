import React, { FC, useEffect, useState } from 'react';
import MessagesComponentDetail from '../../components/messages/DetailComponent';
import Layout from '../../components/ui/layout/Layout';
import chatService from '../../service/chatService';
import { useRouter } from 'next/router';
import { $data, getChats } from '../../store/chatData';
import { useStore } from 'effector-react';

const MessagesDetail: FC = () => {
  const router = useRouter();
  const chatId: any = router.query.id;
  const chats = useStore($data);
  const [isLoading, setIsLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const getChatById = async () => {
    setIsLoading(true);
    const { data } = await chatService.getChatData(chatId);
    setChatMessages(data);
    await setIsLoading(false);
  };
  useEffect(() => {
    chats.length >= 0 && getChats()
  }, []);
  useEffect(() => {
    chatId && getChatById();
  }, [chatId]);
  return (
    <Layout>
      <MessagesComponentDetail chats={chats} chatData={chatMessages} isLoading={isLoading} />
    </Layout>
  );
};

export default MessagesDetail;