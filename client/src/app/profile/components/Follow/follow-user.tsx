'use client';

import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Link from 'next/link';

// components
import { Avatar } from '@/components';
import FollowButtonErrorFallback from './follow-button-errorfallback';
import FollowButton from './follow-button';
import { Icon } from '@iconify/react';

// services
import { BASE_URL } from '@/service/base/api';

interface IProp {
  userName: string;
  userId: string;
  profileImg: string;
}

export default function FollowUser({ userName, userId, profileImg }: IProp) {
  return (
    <div className="relative flex items-center">
      <Link
        href={`/profile/${userId}`}
        className="flex items-center gap-3 pr-20 [&>*:nth-child(1)]:shrink-0"
      >
        <Avatar src={`${BASE_URL}${profileImg}`} alt="user_icon" size="md" />
        <div className="flex flex-col gap-1.5 font-bold">
          <span className="text-lg">{userName}</span>
          <span className="text-sm text-gray-400">{userId}</span>
        </div>
      </Link>
      <div className="absolute right-0">
        <ErrorBoundary FallbackComponent={FollowButtonErrorFallback}>
          <Suspense
            fallback={
              <button className="w-20 p-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 sm:w-24 sm:text-base">
                <Icon
                  icon="line-md:loading-loop"
                  fontSize={25}
                  className="mx-auto"
                />
              </button>
            }
          >
            <FollowButton userId={userId} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
