import { Ref, useEffect, useState } from 'react';
import socket from '../../service/socket';
import { messageDataType } from './types';

export const useChatActive = (messageData: messageDataType, inputValue: string, messagesEndRef: Ref<HTMLDivElement | null>, id: number) => {
  const [isActive, setIsActive] = useState(false)
  const socketCall = (status: boolean) => {
    socket.emit('ROOM:MESSAGE_INPUT', {
      ...messageData,
      isActive: status,
    });
  }
  useEffect(() => {
    if (inputValue?.length === 5) socketCall(true)
    else if(inputValue?.length <= 4) socketCall(false)

    socket.on('ROOM:MESSAGE_INPUT_BACK', (data) => {
      data.senderId !== id && setIsActive(data.isActive);
    });
  }, [inputValue]);
  return { isActive }
}