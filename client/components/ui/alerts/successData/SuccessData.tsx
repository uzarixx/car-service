import React, {FC} from 'react'
import styles from './SuccessData.module.scss'
import SpacingSmall from '../../spacings/SpacingSmall';

const SuccessData: FC = () => {
  return (
    <>
    <SpacingSmall />
  <div className={styles.successData}>Дані успішно збережено!</div>
    </>
  )
}

export default SuccessData;
