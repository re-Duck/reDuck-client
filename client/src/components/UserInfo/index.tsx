import React from 'react';

// components
import { Avatar } from '@/components';

// service
import { BASE_URL } from '@/service/base/api';
import { IUserInfo } from '@/types';

export default function UserInfo({ userData }: { userData: object }) {
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
      {schoolEmailAuthentication && (
        <div className="flex">
          <span className="w-24 min-w-fit">학교이메일</span>
          <span>{schoolEmail}</span>
        </div>
      )}
      <div className="flex">
        <span className="w-24 min-w-fit">회사</span>
        <span>{company}</span>
      </div>
      {companyEmailAuthentication && (
        <div className="flex">
          <span className="w-24 min-w-fit">회사이메일</span>
          <span>{companyEmail}</span>
        </div>
      )}
      <div className="flex">
        <span className="w-24 min-w-fit">개발연차</span>
        <span>{developAnnual}</span>
      </div>
    </div>
  );
}
