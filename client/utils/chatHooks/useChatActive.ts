import { Ref, useEffect, useState } from 'react';
import socket from '../../service/socket';
import { scrollToBottom } from '../useScroll';
import { messageDataType } from './types';

export const useChatActive = (messageData: messageDataType, inputValue: string, messagesEndRef: Ref<HTMLDivElement | null>, id: number) => {
  const [isActive, setIsActive] = useState(false)
  useEffect(() => {
    socket.emit('ROOM:MESSAGE_INPUT', {
      ...messageData,
      isActive: inputValue?.length >= 5,
    });
    socket.on('ROOM:MESSAGE_INPUT_BACK', (data) => {
      data.senderId !== id && setIsActive(data.isActive);
      data.senderId !== id && scrollToBottom(messagesEndRef);
    });
  }, [inputValue]);
  return { isActive }
}