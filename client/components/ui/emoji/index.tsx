import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import styles from './Emoji.module.scss';
import { emojiArray } from '../../../constants/emoji';

interface props {
  setValue: any;
}


const Emoji: FC<props> = ({ setValue }) => {
  const ref = useRef<null | HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    document.addEventListener('mousedown', closeHandler);
    return () => {
      document.addEventListener('mousedown', closeHandler);
    }
  }, []);
  const closeHandler = useCallback(
    (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setActive(false);
      }
    },
    [ref],
  );
  const openEmoji = () => {
    setActive(true);
  };
  const onClickEmoji = (e: string) => () => {
    const inputValue: string = setValue.watch('send');
    setValue.setValue('send', `${inputValue}${e}`);
    setActive(false);
  };
  return (
    <>
      {active &&
        <div className={styles.emojiWrapper} ref={ref}>
          {emojiArray.map((el: string, i: number) =>
            <b key={i} onClick={onClickEmoji(el)}>{el}</b>,
          )}
        </div>}
      <button className={styles.button} type={'button'} onClick={openEmoji}>😀
      </button>
    </>
  );
};

export default Emoji;