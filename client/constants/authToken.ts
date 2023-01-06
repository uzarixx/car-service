import nookies from 'nookies';

const authToken: any = 'authToken';
export const token = nookies.get(authToken).authToken;