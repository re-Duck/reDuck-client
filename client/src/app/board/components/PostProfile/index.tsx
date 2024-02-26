'use client';

import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Link from 'next/link';

// components
import { Avatar, Divider } from '@/components';
import FollowButton from '@/components/FollowButton';

interface IProps {
  userId: string;
  userName: string;
  imageUrl: string;
}

export default function PostProfile({ userId, userName, imageUrl }: IProps) {
  return (
    <div className="flex items-center justify-between py-12 border-b border-gray-scale-500">
      <Link
        href={`/profile/${userId}`}
        className="flex flex-wrap items-center gap-6"
      >
        <Avatar src={imageUrl} alt="user_icon" size="md" />
        <div className="flex flex-col items-start flex-1 gap-2 min-w-fit">
          <h3 className="font-bold text-headline5">{userName}</h3>
          <div className="flex items-center">
            <span className="text-body3 text-gray-scale-600">100 팔로워</span>
            <Divider type="vertical" margin={3} thin={1} />
            <span className="text-body3 text-gray-scale-600">124 채택</span>
          </div>
        </div>
      </Link>
      <ErrorBoundary FallbackComponent={FollowButton.ErrorFallback}>
        <Suspense fallback={<FollowButton.FallbackLoading />}>
          <FollowButton userId={userId} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
