import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { openAlert } from '@/lib/redux/slices/alertSlice';

// services
import { followManager } from '@/service/follow';

// types
import { IFollowStatus, TFollowText } from '@/types';
import { AlertType, errorMessage } from '@/constants/constant';

const FollowButton = ({ userId }: { userId: string }) => {
  const dispatch = useDispatch();

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
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleClickFollowButton = async () => {
    setDisabled(true);
    try {
      if (followState === '팔로우 취소') {
        await followManager.cancleFollow({ userId });
        setFollowState(data?.isFollower ? '맞팔로우' : '팔로우');
      } else {
        await followManager.requestFollow({ userId });
        setFollowState('팔로우 취소');
      }
    } catch {
      dispatch(
        openAlert({
          type: AlertType.ERROR,
          message: errorMessage.UnknownFollow,
        })
      );
    } finally {
      setDisabled(false);
    }
  };

  return (
    <button
      onClick={handleClickFollowButton}
      disabled={disabled}
      className="rounded-md bg-indigo-600 p-2 font-semibold text-pretty text-white text hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 w-20 text-sm sm:w-24 sm:text-base"
    >
      {followState}
    </button>
  );
};

export default FollowButton;
