import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { logOut } from '@/lib/redux/slices/authSlice';

import { Layout, Avatar, Divider } from '@/components';
import { sideBarList } from '@/constant';
import { signOut } from 'next-auth/react';

import { BASE_URL } from '@/service/base/api';

export default function Profile() {
  const router = useRouter();
  const authState = useSelector((state) => state.auth);

  const isMyPage = router.query.id === authState.userId;

  const handleLogout = () => {
    logOut();
    signOut({ redirect: true, callbackUrl: '/' });
  };
  //TODO: 반응형 디자인 고려하기 (모바일 디자인)
  return (
    <Layout>
      <div className="flex mx-auto max-w-5xl p-8 gap-x-16">
        <div className="flex-none text-center">
          <Avatar
            src={`${BASE_URL}${authState.userProfileImgPath}`}
            alt="profileImg"
            size="lg"
          />
          <div className="mt-4">
            <p>임동윤</p>
            <p>@NAVER</p>
            <p>충남대학교 컴퓨터공학과</p>
          </div>
          <Divider type="horizental" margin={4} thin={2} />
          <div className="sm:block hidden">
            {sideBarList.map((name, id) => (
              <div
                key={id}
                className=" bg-indigo-600 p-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1">
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
