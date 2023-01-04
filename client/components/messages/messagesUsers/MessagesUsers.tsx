import React, { FC } from 'react';
import styles from './MessagesUsers.module.scss';
import { useRouter } from 'next/router';
import { chatType } from '../../../constants/type';
interface props {
  chatsData:chatType;
}
const MessagesUsers: FC<props> = ({ chatsData }) => {
  const router = useRouter();
  const onClickUser = (id: number) => {
    router.push(`/messages/${id}`);
  };
  return (
    <nav className={styles.nav}>
      {
        chatsData.user?.map((user, i) =>
          <div key={i}>
            {chatsData.chats?.filter((e) => e.secondId === user.id || e.lastId === user.id).map((el) =>
              <div className={styles.user} key={i}
                   onClick={() => onClickUser(el.id)}>
                <div className={styles.img}>IMG</div>
                <div>{user.userName}</div>
              </div>)}
          </div>,
        )
      }
    </nav>
  );
};
export default MessagesUsers;