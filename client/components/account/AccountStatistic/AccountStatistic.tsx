import React, { FC, useEffect } from 'react';
import styles from './AccountStatistic.module.scss';
import date from '../../../utils/chartDate';
import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { $data, getResponses } from '@/store/responsesData';
import { useStore } from 'effector-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
);
const dates = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
const AccountStatistic: FC = () => {
  const data = useStore($data);
  useEffect(() => {
    getResponses();
  }, []);
  const objects = data.map((value: { createdAt: string }) => date(value.createdAt)).reduce((acc: any, el: any) => {
    acc[el] = (acc[el] || 0) + 1;
    return acc;
  }, {});
  return (
    <div className={styles.wrapper}>
      <Line
        width={'700px'}
        height={'300px'}
        data={{
          labels: dates,
          datasets: [
            {
              label: '',
              pointRadius: 0,
              data: Object.entries(objects).map((el) => {
                return {
                  x: el[0],
                  y: el[1],
                };
              }),
              borderColor: '#4F46E5',
            },
          ],
        }}
      />
    </div>
  );
};

export default AccountStatistic;