import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// services
import { followManager } from '@/service/follow';

// types
import { IFollowStatus, TFollowText } from '@/types';

const FollowButton = ({ userId }: { userId: string }) => {
  const { data } = useQuery({
    queryKey: ['followStatus', userId],
    queryFn: () => followManager.checkFollowStatus({ userId }),
    suspense: true,
  });

  const calculateFollowState = ({
    isFollowing,
    isFollower,
  }: {
    isFollowing: boolean;
    isFollower: boolean;
  }): TFollowText => {
    if (!(isFollower || isFollowing)) {
      return '팔로우';
    } else if (isFollower && !isFollowing) {
      return '맞팔로우';
    } else {
      return '팔로우 취소';
    }
  };

  const [followState, setFollowState] = useState<TFollowText>(
    calculateFollowState(data as IFollowStatus)
  );

  const handleClickFollowButton = () => {
    setFollowState((prevState) => {
      if (prevState === '팔로우 취소') {
        if (data?.isFollower) {
          return '맞팔로우';
        } else {
          return '팔로우';
        }
      } else {
        return '팔로우 취소';
      }
    });
  };

  return (
    <button
      onClick={handleClickFollowButton}
      className="rounded-md bg-indigo-600 p-2 font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 w-20 text-sm sm:w-24 sm:text-base"
    >
      {followState}
    </button>
  );
};

export default FollowButton;
