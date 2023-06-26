import { axios_post } from '@/service/base/api';
import { DefaultUser } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        userId: {
          label: '아이디',
          type: 'text',
          placeholder: '아이디 입력',
        },
        password: {
          label: '비밀번호',
          type: 'password',
          placeholder: '비밀번호 입력',
        },
      },
      async authorize(credential): Promise<DefaultUser> {
        if (!credential) {
          throw new Error('INVALID_TYPING');
        }
        // 로그인 로직
        const suburl = '/login';
        const result: any = await axios_post({ suburl, data: credential });
        if (!result.isOkay) {
          throw new Error(result.data.code);
        }
        const userInfo = {
          id: result.data.userId,
          name: result.data.name,
          userProfileImgPath: result.data.userProfileImgPath,
          email: result.data.email,
          token: result.data.accessToken,
        };

        return userInfo;
      },
    }),
  ],
  callbacks: {
    async jwt(props) {
      const { token, user, trigger, session } = props;
      if (trigger === 'update') {
        return { ...token, ...session };
      }
      if (!user) return token;
      return props;
    },

    async session({ token, session }: any) {
      session = {
        expires: session.expires,
        user: {
          id: token.user.id,
          name: token.user.name,
          email: token.user.email,
          userProfileImgPath: token.user.userProfileImgPath,
          token: token.user.token,
        },
      };

      return session;
    },
  },
});
