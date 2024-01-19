'use client';

import React, { useState, Suspense, useMemo } from 'react';
import { useSelector } from 'react-redux';

// components
import { Divider, Skeleton } from '@/components';
import {
  UserInfo,
  EditProfile,
  SideProfile,
  SideSkeleton,
  Follow,
} from '../components';

// constant
import { sideBarList } from '@/constants/constant';

// types
import { MyPageTab } from '@/types';
import { IReduxState } from '@/types/redux/IReduxState';

// icons
import { Icon } from '@iconify/react';

export default function Profile({ params }: { params: { id: string } }) {
  const id = params.id;

  const user = useSelector((state: IReduxState) => state.auth);

  const isMyPage = id === user.userId;

  const [selectedMenu, setSelectedMenu] = useState<MyPageTab>('프로필');

  const handleSelectMenu = (content: MyPageTab) => {
    setSelectedMenu(content);
  };

  const profileContent = useMemo(() => {
    if (id === undefined) {
      return;
    }
    switch (selectedMenu) {
      case '프로필':
        return isMyPage ? (
          <EditProfile targetUserId={id as string} />
        ) : (
          <UserInfo targetUserId={id as string} />
        );
      case '친구목록':
        return <Follow targetUserId={id as string} />;
      default:
        return <div>준비중</div>;
    }
  }, [selectedMenu, id]);

  if (id === undefined) {
    return null;
  }

  return (
    <div className="flex flex-col sm:flex-row sm:max-w-5xl sm:p-8 sm:mx-auto sm:gap-x-16">
      <div className="hidden sm:flex-none sm:text-center sm:block">
        <Suspense fallback={<SideSkeleton />}>
          <SideProfile targetUserId={id as string} />
        </Suspense>
        <Divider type="horizental" margin={4} thin={2} />
        <ul>
          {sideBarList.map(({ content, iconName }) => (
            <li
              key={content}
              className={`${
                content === selectedMenu &&
                'before:block before:absolute before:w-1 before:h-8 before:translate-x-[-15px] before:bg-indigo-600 before:rounded-sm bg-gray-200'
              } text-left rounded-md p-2 text-sm font-semibold text-black hover:bg-gray-200 flex items-center`}
              onClick={() => handleSelectMenu(content)}
            >
              <Icon
                icon={iconName}
                fontSize={15}
                strokeWidth={3}
                color="black"
              />
              <span className="ml-4">{content}</span>
            </li>
          ))}
        </ul>
      </div>
      <ul className="flex mb-4 sm:hidden">
        {sideBarList.map(({ content, iconName }) => (
          <li
            key={content}
            className={`${
              content === selectedMenu &&
              'before:block before:absolute before:w-1/5 before:h-1 before:translate-y-[28px] before:bg-indigo-600 before:rounded-sm bg-gray-200'
            } rounded-md p-2 text-sm font-semibold text-black hover:bg-gray-200 flex flex-col grow justify-center items-center`}
            onClick={() => handleSelectMenu(content)}
          >
            <Icon icon={iconName} fontSize={24} strokeWidth={3} color="black" />
            <span>{content}</span>
          </li>
        ))}
      </ul>
      <div className="flex flex-col flex-1">
        <Suspense fallback={<Skeleton.Box width="w-full" height="h-full" />}>
          {profileContent}
        </Suspense>
      </div>
    </div>
  );
}
