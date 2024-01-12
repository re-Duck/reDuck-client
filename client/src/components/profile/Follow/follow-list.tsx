import React from 'react';
import { useQuery } from '@tanstack/react-query';

// components
import FollowUser from './follow-user';

// services
import { followManager } from '@/service/follow';

interface IProp {
  type: 'follower' | 'following';
  userId: string;
}

export default function FollowList({ type, userId }: IProp) {
  const { data } = useQuery({
    queryKey: ['followList', type, userId],
    queryFn: () => {
      return type === 'follower'
        ? followManager.getFollower({ userId })
        : followManager.getFollowing({ userId });
    },
    suspense: true,
  });

  return (
    <>
      {data?.length !== 0 ? (
        data?.map((value) => <FollowUser key={value.userId} {...value} />)
      ) : (
        <div className="text-center text-lg font-bold">
          <p>목록이 텅! 비었습니다.</p>
        </div>
      )}
    </>
  );
}
