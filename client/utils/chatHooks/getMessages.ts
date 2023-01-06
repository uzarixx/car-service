import chatService from '../../service/chatService';
import { setMessages } from '../../store/chatData';
import socket from '../../service/socket';

export const getMessages = async (chatId: string) => {
  try {
    const { data } = await chatService.getMessages(chatId);
    setMessages(data);
  } catch (e) {
    return socket.emit('ROOM:DISCONNECT', { roomId: chatId });
  }
};
