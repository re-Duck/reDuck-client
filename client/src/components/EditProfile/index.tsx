import React from 'react';
import { logOut } from '@/lib/redux/slices/authSlice';
import { signOut } from 'next-auth/react';

// packages
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

// components
import { Avatar } from '..';

// service
import { BASE_URL } from '@/service/base/api';
import { IUserInfo } from '@/types';

export default function EditProfile({ userData }: { userData: object }) {
  const {
    company,
    companyEmail,
    companyEmailAuthentication,
    developAnnual,
    email,
    name,
    school,
    schoolEmail,
    schoolEmailAuthentication,
    userId,
    userProfileImgPath,
  }: IUserInfo = userData;

  const handleLogout = () => {
    logOut();
    signOut({ redirect: true, callbackUrl: '/' });
  };
  return (
    <div className="flex flex-col p-8 gap-4">
      <div className="flex">
        <span className="w-24 min-w-fit">이름</span>
        <span>{name}</span>
      </div>
      <div className="flex">
        <span className="w-24 min-w-fit">아이디</span>
        <span>{userId}</span>
      </div>
      <div className="flex items-center">
        <span className="w-24 min-w-fit">프로필이미지</span>
        <Avatar
          src={`${BASE_URL}${userProfileImgPath}`}
          alt="profileImg"
          size="sm"
        />
      </div>
      <div className="flex">
        <span className="w-24 min-w-fit">이메일</span>
        <span>{email}</span>
      </div>
      <div className="flex">
        <span className="w-24 min-w-fit">학교</span>
        <span>{school}</span>
      </div>
      <div className="flex">
        <span className="w-24 min-w-fit">학교이메일</span>
        <span>{schoolEmailAuthentication ? schoolEmail : 'none'}</span>
      </div>
      <div className="flex">
        <span className="w-24 min-w-fit">회사</span>
        <span>{company}</span>
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
      <button
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70"
        onClick={handleLogout}
      >
        로그아웃
      </button>
    </div>
  );
}
