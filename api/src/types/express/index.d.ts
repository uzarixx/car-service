import 'express';


// **** Declaration Merging **** //

declare module 'express' {

  export interface Request {
    signedCookies: Record<string, string>;
  }
}


export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      FRONTEND_URL: string;
      MONGO_URL: string;
      SECRET_KEY: string;
      ENV: 'test' | 'dev' | 'prod';
    }
  }
}