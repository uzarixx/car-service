import { useEffect } from 'react';
import socket from '../../service/socket';
import { getMessages } from './getMessages';


export const useConnectChat = (chatId: any) => {
  useEffect(() => {
    socket.emit('ROOM:CONNECT', { roomId: chatId });
    chatId && getMessages(chatId);
  }, [chatId]);
}