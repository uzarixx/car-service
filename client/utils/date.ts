const currentDate = (timeStamp: any) => {
  if (!timeStamp) {
    return false;
  }

  const date = new Date(timeStamp);

  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const time = date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });

  return `${day}.${month}.${year}, ${time}`;
};

export default currentDate;
