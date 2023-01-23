import React, { FC } from 'react';
import styles from './MessagesUsers.module.scss';
import { useRouter } from 'next/router';
import { chatType } from '@/constants/type';
import UserIcon from '@/components/ui/icons/UserIcon';

interface props {
  chatsData: chatType;
}

const MessagesUsers: FC<props> = ({ chatsData }) => {
  const router = useRouter();
  const onClickUser = (id: number) => {
    router.push(`/messages/${id}`);
  };
  return (
    <nav className={styles.nav}>
      {chatsData.chats?.map((chat) =>
        <div key={chat.id}>
          <div className={styles.user} onClick={() => onClickUser(chat.id)}>
            {chatsData.user?.map((el, i) =>
              <div className={styles.userWrapper} key={i}>
                {el.id === chat.secondId || el.id === chat.lastId ?
                 <><div className={styles.img}>{el.photo ? <img src={el.photo} alt='user-avatar'/> : <UserIcon />}
                 </div><p>{el.userName}</p></> : <></>}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
export default MessagesUsers;