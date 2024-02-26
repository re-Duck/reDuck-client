'use client';

import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Link from 'next/link';

// components
import { Avatar } from '@/components';
import FollowButton from '@/components/FollowButton';

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
        <ErrorBoundary FallbackComponent={FollowButton.ErrorFallback}>
          <Suspense fallback={<FollowButton.FallbackLoading />}>
            <FollowButton userId={userId} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
