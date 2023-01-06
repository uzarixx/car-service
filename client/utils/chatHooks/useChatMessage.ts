import { Ref, useEffect } from 'react';
import socket from '../../service/socket';
import { setMessages } from '../../store/chatData';
import { scrollToBottom } from '../useScroll';
import { messageDataType } from './types';

export const useChatMessage = (messages: messageDataType[], messagesEndRef: Ref<HTMLDivElement | null>) => {
  useEffect(() => {
    socket.on('ROOM:MESSAGE_BACK', (data) => {
      setMessages(messages.concat(data));
    });
    scrollToBottom(messagesEndRef);
  }, [messages]);
}