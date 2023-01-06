import { createStore, createEvent } from 'effector';
import chatService from '../service/chatService';

export const chatData = createEvent('chat data')
export const loadingChatData = createEvent<boolean>('loading user data')
export const setMessages = createEvent<any>('chat messages')
export const $data = createStore([]).on(chatData, (_, newData: any) => newData)
export const $loadingData = createStore(true).on(loadingChatData, (_, loading: boolean) => loading)
export const $messages = createStore([]).on(setMessages, (_, messages) => messages)




export const getChats = async () => {
  loadingChatData(true);
  const { data } = await chatService.getChats();
  chatData(data);
  loadingChatData(false);
};