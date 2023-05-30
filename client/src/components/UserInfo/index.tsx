import React from 'react';

// components
import { Avatar } from '@/components';
import FlexLabelContent from './flex-label-content';

// service
import { BASE_URL } from '@/service/base/api';
import { IUserInfo } from '@/types';

export default function UserInfo({ userData }: { userData: IUserInfo }) {
  const {
    company,
    companyEmail,
    developAnnual,
    email,
    name,
    school,
    schoolEmail,
    userId,
    userProfileImgPath,
  }: IUserInfo = userData;
  const labelContent = [
    {
      label: '이름',
      content: <span>{name}</span>,
    },
    {
      label: '아이디',
      content: <span>{userId}</span>,
    },
    {
      label: '프로필이미지',
      content: (
        <Avatar
          src={`${BASE_URL}${userProfileImgPath}`}
          alt="profileImg"
          size="sm"
        />
      ),
    },
    {
      label: '이메일',
      content: <span>{email}</span>,
    },
    {
      label: '학교',
      content: <span>{school}</span>,
    },
    {
      label: '학교이메일',
      content: <span>{schoolEmail}</span>,
    },
    {
      label: '회사',
      content: <span>{company}</span>,
    },
    {
      label: '회사이메일',
      content: <span>{companyEmail}</span>,
    },
    {
      label: '개발연차',
      content: <span>{developAnnual}</span>,
    },
  ];
  return (
    <div className="flex flex-col p-8 gap-4">
      {labelContent.map(({ label, content }) => (
        <FlexLabelContent key={label} label={label} content={content} />
      ))}
    </div>
  );
}
