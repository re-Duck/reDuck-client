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
      async authorize(credential, req): Promise<DefaultUser> {
        if (!credential) {
          throw new Error('INVALID_TYPING');
        }
        // 로그인 로직
        const suburl = '/login';
        const result: any = await axios_post({ suburl, data: credential });
        if (!result.isOkay) {
          throw new Error(result.data.code);
        }
        console.log(result);
        const userInfo = {
          id: result.data.userId,
          name: result.data.name,
          image: result.data.userProfileImg,
          email: result.data.email,
          token: result.data.accessToken,
        };

        return userInfo;
      },
    }),
  ],
  callbacks: {
    async jwt(props) {
      console.log(props);
      //   console.log('account 정보', account);
      //   console.log('token 정보', token);
      //   console.log('user 정보', user);
      //   console.log('profile: ', profile);
      //   if (account) {
      //     token.accessToken = account.access_token;
      //   }
      //   return token;
      return props.token;
    },

    async session({ session, token, user }) {
      //   console.log('Session 정보', session);
      //   console.log('Token정보', token);
      //   console.log('User정보', user);

      session.accessToken = token;

      return session;
    },
  },
});
