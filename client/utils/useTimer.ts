import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';


export const useTimer = (status: boolean, pathName: string) => {
  const router = useRouter()
  const [seconds, setSeconds] = useState(10);
  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) setSeconds(seconds - 1);
    }, 1000);
    seconds === 0 && status && router.push(pathName);
    return () => clearInterval(timer);
  }, [seconds]);

  return {
    seconds,
  };
};