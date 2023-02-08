const currentDate = (timeStamp: number | string) => {
  if (!timeStamp) {
    return false;
  }
  const date = new Date(timeStamp);
  return date.getDate();
};

export default currentDate;
