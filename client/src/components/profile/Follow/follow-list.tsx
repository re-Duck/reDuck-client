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

  console.log(data);

  return (
    <div className="flex flex-col gap-4">
      {data?.map((value) => (
        <FollowUser key={value.userId} {...value} />
      ))}
    </div>
  );
}
