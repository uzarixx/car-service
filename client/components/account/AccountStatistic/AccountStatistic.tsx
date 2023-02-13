import React, { FC, useEffect } from 'react';
import styles from './AccountStatistic.module.scss';
import date from '../../../utils/chartDate';
import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement, scales,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { $data, getResponses } from '@/store/responsesData';
import { useStore } from 'effector-react';
import { dates } from '@/constants/dates';
import SpacingMiddle from '@/components/ui/spacings/SpacingMiddle';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
);

const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
const dateNow = new Date();
const month = months[dateNow.getMonth()];
const AccountStatistic: FC = () => {
  const data = useStore($data);
  useEffect(() => {
    getResponses();
  }, []);
  const objects: Record<string, number> = data
    .map((value: { createdAt: string }) => date(value.createdAt))
    .filter((el: boolean | { month: string }) => typeof el !== 'boolean' && el.month == month)
    .map((el: boolean | { day: number }) => typeof el !== 'boolean' && el.day)
    .reduce((acc:any, el: any) => {
      acc[el] = (acc[el] || 0) + 1;
      return acc;
    }, {});
  return (
    <div className={styles.wrapper}>
      <h2>Статистика кількості відгуків на ваше портфоліо</h2>
      <SpacingMiddle />
      <Line
        width={'700px'}
        height={'300px'}
        options={{
          scales: {
            y: {
              ticks: {
                precision: 0,
              },
            },
          },
        }}
        data={{
          labels: dates,
          datasets: [
            {
              label: '',
              data: Object.entries(objects).map((el) => {
                return {
                  x: el[0],
                  y: el[1],
                };
              }),
              borderColor: '#79be00',
            },
          ],
        }}
      />
    </div>
  );
};

export default AccountStatistic;