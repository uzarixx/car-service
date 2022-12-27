import React, { FC } from 'react';
import styles from './ButtonGreen.module.scss';

interface ButtonProps {
  children: string
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
}


const ButtonGreen: FC<ButtonProps> = ({ children, type, onClick }) => {
  return (<button type={type} onClick={onClick} className={styles.button}>{children}</button>);
};

export default ButtonGreen;