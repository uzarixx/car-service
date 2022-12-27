export const debounce = (callback: any, delay: number) => {
  let timer = null as any;
  return (...args: any) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
