import { JWT } from 'next-auth/jwt';
import NextAuth from 'next-auth/next';
import { DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      userId: string;
      name: string;
      image: string;
    };
    accessToken: JWT;
  }
}
export interface User extends DefaultUser {}
