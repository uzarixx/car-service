import { setMessages } from '../../store/chatData';
import chatService from '../../service/chatService';
import socket from '../../service/socket';
import {messageDataType} from './types'


export const chatSend = async (data: any, messages: messageDataType[], messageData: messageDataType, chatId: number, methods: any) => {
  setMessages(messages.concat(messageData));
  await chatService.createMessage(chatId, data.send);
  await socket.emit('ROOM:MESSAGE_SEND', { ...messageData });
  await socket.emit('ROOM:MESSAGE_INPUT', {
    ...messageData,
    isActive: false,
  });
  methods.setValue('send', '');
};