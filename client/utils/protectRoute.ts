export const redirectToHome = () => {
  return {
    redirect: {
      permanent: false,
      destination: '/account',
    },
    props: {},
  };
};