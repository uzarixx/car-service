import React, { FC, useEffect, useState } from 'react';
import styles from './UserCard.module.scss';
import { useRouter } from 'next/router';
import usersService from '@/service/usersService';
import UserIcon from '@components/icons/UserIcon';
import Pagination from '@components/ui/pagination/Pagination';

interface usersType {
  id: number;
  city: string;
  sliceDesc: string;
  email: string;
  experience: string;
  phoneNumber: string;
  photo: string;
  role: string;
  userLastName: string;
  userName: string;
  verify: boolean;
}


const fetchUsers = async (page: number) => {
  const { data } = await usersService.getUsers(page);
  return (
    await data
  );
};


const UserCard: FC = () => {
  const [users, setUsers] = useState([]);
  const [pageCount, setPageCount] = useState(0)
  const router = useRouter();
  const onClickUser = (id: number) => () => {
    return router.push(`/user/${id}`);
  };
  useEffect(() => {
    fetchUsers(Number(router.query.page)).then((res) => {
      setUsers(res.rows);
      setPageCount(res.count)
      console.log(res);
    }).catch((e) => console.error(e));
  }, [router.query]);

  return (
    <>
      {users.map((el: usersType) =>
        <div
          className={styles.userCardWrapper}
          onClick={onClickUser(el.id)}
          key={el.id}>
          {el.role === 'Picker' && <span
            className={`${styles.statusDot} ${el.verify || styles.statusDotActive}`}></span>}
          <div className={styles.userParams}>
            <div className={styles.avatar}>{el.photo ?
              <img src={el.photo} alt='user-avatar' /> : <UserIcon />}</div>
            <p>{el.role === 'Picker' ? 'Підбирач' : 'Користувач'}</p>
            <p>{el.userName}</p>
            <p>{el.userLastName || 'Призвище'}</p>
            {el.role === 'Picker' && <p>{el.experience || 'Досвід'}</p>}
            {el.role === 'Picker' && <p>{el.sliceDesc || 'Опис профілю'}</p>}
            <p>{el.phoneNumber || 'Телефон'}</p>
            <p>{el.email}</p>
          </div>
        </div>,
      )}
      <Pagination pageCount={pageCount} paginateRoute={''} />
    </>
  );
};

export default UserCard;
