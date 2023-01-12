import React, { FC, useRef } from 'react';
import styles from './MessagesChat.module.scss';
import { FormProvider, useForm } from 'react-hook-form';
import PostNewAdInput from '../../ui/inputs/postNewAdInput';
import { useRouter } from 'next/router';
import SpacingSmall from '../../ui/spacings/SpacingSmall';
import SendIco from '../../ui/icons/SendIco';
import UserIcon from '../../ui/icons/UserIcon';
import { useStore } from 'effector-react';
import { $data } from '../../../store/userData';
import { userType } from '../../../constants/type';
import { $messages } from '../../../store/chatData';
import { chatSend } from '../../../utils/chatHooks/chatSend';
import { useConnectChat } from '../../../utils/chatHooks/useConnectChat';
import { useChatMessage } from '../../../utils/chatHooks/useChatMessage';
import { useChatActive } from '../../../utils/chatHooks/useChatActive';
import Message from './message/Message';
import MessageTyping from './message/MessageTyping';
import { yupResolver } from '@hookform/resolvers/yup';
import { chatValidate } from '../../../utils/validation/chatValidate';

interface messagesProps {
  chatData: { id: number, userName: string, photo: string }[];
}

interface messageDataType {
  roomId: string | string[] | undefined;
  message: string;
  senderId: number;
}

const MessagesChat: FC<messagesProps> = ({ chatData }) => {
  const router = useRouter();
  const authUser: userType | any = useStore($data);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messages: messageDataType[] = useStore($messages);
  const methods = useForm({
    resolver: yupResolver(chatValidate)
  });
  const inputValue = methods.watch('send');
  const chatId = router.query.id;
  const messageData: messageDataType = {
    roomId: chatId,
    message: inputValue,
    senderId: authUser?.id,
  };
  const onSubmit = async (data: any) => {
    await chatSend(data, messages, messageData, Number(chatId), methods);
  };
  useConnectChat(chatId);
  useChatMessage(messages, messagesEndRef);
  const { isActive } = useChatActive(messageData, inputValue, messagesEndRef, authUser.id);
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={styles.chatForm}>
        {chatData.map((el) =>
          <div className={styles.chatHead} key={el.id}>
            <div className={styles.avatar}>
              {el.photo ? <img src={el.photo} alt={'user-avatar'} /> :
                <UserIcon />}
            </div>
            <p>{el.userName}</p>
          </div>)}
        <SpacingSmall />
        <div className={styles.mainChat}>
          <div className={styles.chatList}>
            {messages.map((el: { senderId: number, message: string }, i) =>
              <div key={i} className={authUser?.id === el.senderId ? styles.isSender : styles.isReceiver}>
                <Message authUserId={authUser?.id} senderId={el.senderId} message={el.message} chatData={chatData}/>
              </div>
            )}
          <MessageTyping isActive={isActive} chatData={chatData}/>
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className={styles.inputMenu}>
          <PostNewAdInput
            placeholder={'Введіть повідомлення..'}
            name={'send'}
            type={'text'}
            error={methods.formState.errors.send}
          />
          {methods.formState.errors.send && <p>{`${methods.formState.errors.send?.message}`}</p>}
          <button type={'submit'}><SendIco /></button>
        </div>
      </form>
    </FormProvider>
  );
};

export default MessagesChat;