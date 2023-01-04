import React, {
  FC,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './MessagesChat.module.scss';
import { FormProvider, useForm } from 'react-hook-form';
import PostNewAdInput from '../../ui/inputs/postNewAdInput';
import socket from '../../../service/socket';
import chatService from '../../../service/chatService';
import { useRouter } from 'next/router';
import SpacingSmall from '../../ui/spacings/SpacingSmall';
import SendIco from '../../ui/icons/SendIco';
import { scrollToBottom } from '../../../utils/chatUtil';
import { userType } from '../../../constants/type';

interface messagesProps {
  authUser: userType;
  chatData: {id: number, userName: string, photo: string}[];
}
const MessagesChat: FC<messagesProps> = ({ authUser, chatData }) => {
  const router = useRouter();
  const messagesEndRef = useRef<any>(null);
  const [messages, setMessages] = useState([]);
  const methods = useForm();
  const chatId: any = router.query.id;
  const messageData: any = {
    roomId: chatId,
    message: methods.watch('send'),
    senderId: authUser?.id,
  };
  const onSubmit = async (data: any) => {
    setMessages(messages.concat(messageData));
    await chatService.createMessage(chatId, data.send);
    await socket.emit('ROOM:MESSAGE_SEND', messageData);
    methods.setValue('send', '');
  };
  const getMessages = async () => {
    try {
      const { data } = await chatService.getMessages(chatId);
      setMessages(data);
    }catch (e) {
      return socket.emit('ROOM:DISCONNECT', { roomId: chatId });
    }
  };
  useEffect(() => {
    socket.on('ROOM:MESSAGE_BACK', (data) => {
      setMessages(messages.concat(data));
    });
    scrollToBottom(messagesEndRef);
  }, [messages]);
  useEffect(() => {
    socket.emit('ROOM:CONNECT', { roomId: chatId });
    chatId && getMessages();
  }, [chatId]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={styles.chatForm}>
        {chatData.map((el) => el.userName)}
        <SpacingSmall />
        <div className={styles.mainChat}>
          <div className={styles.chatList}>
            {messages.map((el: {senderId: number, message: string}, i) =>
              <div key={i}
                   className={authUser?.id === el.senderId ? styles.isSender : styles.isReceiver}>
                <p className={styles.messageBlock}>
                  <span>{chatData.map((el) => el.userName)}</span>
                  {el.message}

                </p>
              </div>,
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className={styles.inputMenu}>
          <PostNewAdInput
            placeholder={'Введіть повідомлення..'}
            name={'send'}
            type={'text'}
          />
          <button type={'submit'}><SendIco /></button>
        </div>
      </form>
    </FormProvider>
  );
};

export default MessagesChat;