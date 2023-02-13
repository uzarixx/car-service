const currentDate = (timeStamp: number | string) => {
  if (!timeStamp) {
    return false;
  }
  const date = new Date(timeStamp);
  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const month = months[date.getMonth()];
  const day = date.getDate();
  return { day: day, month: month } || {};
};

export default currentDate;
