import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useModal } from '@/hooks';
import { useSelector } from 'react-redux';

// components
import { Avatar } from '@/components';
import FlexLabelContent from './flex-label-content';

// service
import { BASE_URL } from '@/service/base/api';
import { IUserInfo } from '@/types';
import { createChatRoom } from '@/service/chat-post';

// constant
import { ModalType, errorMessage } from '@/constants/constant';

export default function UserInfo({ userData }: { userData: IUserInfo }) {
  const router = useRouter();
  const user = useSelector((state: any) => state.auth);
  const { openModal } = useModal();

  const [isDisable, setIsDisable] = useState(false);
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
          src={`${BASE_URL}${userProfileImgPath || ''}`}
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

  const handleChatRoute = async () => {
    setIsDisable(true);
    try {
      const data = await createChatRoom({
        otherIds: [userId],
        roomName: '',
        token: user.token,
      });
      const { roomId } = data;
      router.push({
        pathname: '/chat',
        query: {
          roomId,
        },
      });
    } catch (error) {
      openModal({
        type: ModalType.ERROR,
        message: errorMessage.error,
      });
      setIsDisable(false);
    }
  };

  return (
    <>
      <div className="flex flex-1 flex-col p-8 gap-4">
        {labelContent.map(({ label, content }) => (
          <FlexLabelContent key={label} label={label} content={content} />
        ))}
      </div>
      <div className="flex items-baseline">
        <button
          onClick={handleChatRoute}
          disabled={isDisable}
          className="rounded-md bg-indigo-600 p-2 font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 w-20 text-sm sm:w-24 sm:text-base"
        >
          1:1 채팅
        </button>
      </div>
    </>
  );
}
