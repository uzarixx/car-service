import AdminLayout from '@components/layout/AdminLayout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home = () => {
  const router = useRouter();
  const path = router.query.path;
  useEffect(() => {
    return () => {
      if (!path || [path].includes(['offers', 'users'])) {
        router.push({ query: { path: 'users' } });
      }
    };
  }, [router]);

  return (
    <>
      <AdminLayout />
    </>
  );
};


export default Home;