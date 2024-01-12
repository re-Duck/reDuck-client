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
        <div className="text-center font-bold">
          <p>친구리스트가 없습니다!</p> <p>활동하여 친구를 늘려보세요!</p>
        </div>
      )}
    </>
  );
}
