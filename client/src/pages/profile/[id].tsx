import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { logOut } from '@/lib/redux/slices/authSlice';

import { Layout, Avatar, Divider } from '@/components';
import { sideBarList } from '@/constant';
import { signOut } from 'next-auth/react';

import { BASE_URL, axios_get } from '@/service/base/api';

export default function Profile({ pageProps }) {
  const router = useRouter();
  const authState = useSelector((state) => state.auth);

  const isMyPage = router.query.id === authState.userId;

  const handleLogout = () => {
    logOut();
    signOut({ redirect: true, callbackUrl: '/' });
  };

  const { userData } = pageProps;
  const {
    company,
    companyEmail,
    companyEmailAuthentication,
    developAnnual,
    email,
    name,
    posts,
    school,
    schoolEmail,
    schoolEmailAuthentication,
    userId,
    userProfileImgPath,
  } = userData;
  //TODO: 반응형 디자인 고려하기 (모바일 디자인)
  return (
    <Layout>
      <div className="flex mx-auto max-w-5xl p-8 gap-x-16">
        <div className="flex-none text-center">
          <Avatar
            src={`${BASE_URL}${userProfileImgPath}`}
            alt="profileImg"
            size="lg"
          />
          <div className="mt-4">
            <p>{name}</p>
            <p>@{company}</p>
            <p>{school}</p>
          </div>
          <Divider type="horizental" margin={4} thin={2} />
          <div className="sm:block hidden">
            {sideBarList.map((content, id) => (
              <div
                key={id}
                className=" bg-indigo-600 p-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70"
              >
                {content}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col flex-1 border p-8 gap-2">
          <div className="flex">
            <span className="w-24 min-w-fit">아이디</span>
            <span>{userId}</span>
          </div>
          <div className="flex">
            <span className="w-24 min-w-fit">이메일</span>
            <span>{email}</span>
          </div>
          <div className="flex">
            <span className="w-24 min-w-fit">학교이메일</span>
            <span>{schoolEmailAuthentication ? schoolEmail : 'none'}</span>
          </div>
          <div className="flex">
            <span className="w-24 min-w-fit">회사이메일</span>
            <span>{companyEmailAuthentication ? companyEmail : 'none'}</span>
          </div>
          <div className="flex">
            <span className="w-24 min-w-fit">개발연차</span>
            <span>{developAnnual}</span>
          </div>
          <button className="flex-none rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70">
            정보수정
          </button>
          {isMyPage && (
            <button
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({
  params: { id },
}: {
  params: { id: string };
}) {
  const suburl = `/user/${id}`;
  const res = await axios_get({
    suburl,
  });
  return {
    props: {
      userData: res.data,
    },
  };
}
