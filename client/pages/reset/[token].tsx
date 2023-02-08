import React, {FC} from 'react'
import ForgotToken from '../../components/reset/token';
import Layout from '../../components/ui/layout/Layout';

const Token: FC = () => {
  return (
    <Layout title={'Відновлення паролю'} description={''}>
      <ForgotToken/>
    </Layout>
  )
}

export default Token;
