import React, {FC} from 'react';
import styles from './Layout.module.scss';
import Header from "../../semantics/header/Header";

interface Props {
  children: React.ReactNode;
}


const Layout: FC<Props> = ({children}) => {
  return (
    <>
      <Header/>
      <div className={styles.layoutContainer}>
      <div className={styles.layoutWrapper}>
        {children}
      </div>
      </div>
    </>
  );
};

export default Layout;