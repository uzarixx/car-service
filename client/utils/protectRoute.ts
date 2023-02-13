export const redirectToHome = () => {
  return {
    redirect: {
      permanent: false,
      destination: '/account',
    },
    props: {},
  };
};

export const redirectToPicker = () => {
  return {
    redirect: {
      permanent: false,
      destination: '/picker',
    },
    props: {},
  };
}

export const redirectToOffer = () => {
  return {
    redirect: {
      permanent: false,
      destination: '/offer',
    },
    props: {},
  };
}

export const redirectToIndex = () => {
  return {
    redirect: {
      permanent: false,
      destination: '/',
    },
    props: {},
  };
}