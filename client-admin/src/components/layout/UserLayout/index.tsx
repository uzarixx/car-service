import React, {FC} from 'react'
import styles from './UserLayout.module.scss'
import Navigation from '@components/navigation';
import UserDetail from '@components/user/userDetail';

const UserLayout: FC = () => {
  return (
    <div className={styles.wrapper}>
      <Navigation/>
      <UserDetail/>
    </div>
  )
}

export default  UserLayout;