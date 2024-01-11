import React, { useState, Suspense } from 'react';
import { useRouter } from 'next/router';
import { useModal } from '@/hooks';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

// components
import { Avatar } from '@/components';
import FlexLabelContent from './flex-label-content';
import FollowButton from './follow-button';
import FollowButtonErrorFallback from './follow-button-errorfallback';

// service
import { BASE_URL } from '@/service/base/api';
import { createChatRoom } from '@/service/chat-post';
import { userManager } from '@/service/user';

// constant
import { ModalType, errorMessage } from '@/constants/constant';

// types
import { IUserInfo } from '@/types';
import { IReduxState } from '@/types/redux/IReduxState';

// icon
import { Icon } from '@iconify/react';

export default function UserInfo({ targetUserId }: { targetUserId: string }) {
  const user = useSelector((state: IReduxState) => state.auth);
  const router = useRouter();
  const { openModal } = useModal();

  const [isDisable, setIsDisable] = useState(false);

  const { data: userData } = useQuery({
    queryKey: ['userInfo', targetUserId],
    queryFn: () => userManager.getUser(targetUserId),
    suspense: true,
  });

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
  } = userData as IUserInfo;

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
    if (!user.userId) {
      openModal({
        type: ModalType.ERROR,
        message: errorMessage.needLogin,
      });
      return;
    }
    setIsDisable(true);
    try {
      const data = await createChatRoom({
        otherIds: [userId],
        roomName: name,
      });
      const { roomId, roomName } = data;
      router.push({
        pathname: '/chat',
        query: {
          roomId,
          roomName,
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
      <div className="flex flex-1 flex-col bg-white border p-4 gap-4 sm:p-8">
        {labelContent.map(({ label, content }) => (
          <FlexLabelContent key={label} label={label} content={content} />
        ))}
      </div>
      <div className="flex justify-end gap-1 m-2">
        <Suspense
          fallback={
            <button className="rounded-md bg-indigo-600 p-2 font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 w-20 text-sm sm:w-24 sm:text-base">
              <Icon
                icon="line-md:loading-loop"
                fontSize={25}
                className="mx-auto"
              />
            </button>
          }
        >
          <ErrorBoundary FallbackComponent={FollowButtonErrorFallback}>
            <FollowButton userId={targetUserId} />
          </ErrorBoundary>
        </Suspense>
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
