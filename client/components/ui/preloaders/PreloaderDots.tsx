import React, { FC } from 'react';

const PreloaderDots: FC = () => {
  return (
    <div style={{ width: 100, display: 'flex', justifyContent: 'center', margin: "0 auto"}}>
      <img src={'https://i.imgur.com/nxJVYaz.gif'} width={100} height={100}
           alt={'Preloader'} />
    </div>
  );
};

export default PreloaderDots;