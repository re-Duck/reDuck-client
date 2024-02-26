import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { openAlert } from '@/lib/redux/features/alert/alertSlice';

// components
import Button from '../base/Button';
import { Icon } from '@iconify/react';
import FollowButtonErrorFallback from './FollowButtonErrorFallback';
import FollowButtonLoading from './FollowButtonLoading';

// services
import { followManager } from '@/service/follow';

// types
import { IFollowStatus } from '@/types';
import { AlertType, errorMessage } from '@/constants/constant';

const FollowButton = ({ userId }: { userId: string }) => {
  const dispatch = useDispatch();

  const { data } = useQuery({
    queryKey: ['followStatus', userId],
    queryFn: () => followManager.checkFollowStatus({ userId }),
    retry: 1,
    suspense: true,
    useErrorBoundary: true,
  });

  const calculateFollowState = ({
    isFollowing,
    isFollower,
  }: {
    isFollowing: boolean;
    isFollower: boolean;
  }) => {
    if (!(isFollower || isFollowing)) {
      return (
        <div className="flex items-center gap-1.5 flex-nowrap">
          <Icon icon="clarity:plus-line" width={20} height={20} />
          <span className="text-body2 text-nowrap">팔로우</span>
        </div>
      );
    } else if (isFollower && !isFollowing) {
      return '맞팔로우';
    } else {
      return '팔로우 취소';
    }
  };

  const [followState, setFollowState] = useState(
    calculateFollowState(data as IFollowStatus)
  );
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleClickFollowButton = async () => {
    setDisabled(true);
    try {
      if (followState === '팔로우 취소') {
        await followManager.cancleFollow({ userId });
        setFollowState(
          data?.isFollower ? (
            '맞팔로우'
          ) : (
            <div className="flex items-center gap-1.5">
              <Icon icon="clarity:plus-line" width={20} height={20} />
              <span>팔로우</span>
            </div>
          )
        );
      } else {
        await followManager.requestFollow({ userId });
        setFollowState('팔로우 취소');
      }
    } catch {
      dispatch(
        openAlert({
          type: AlertType.ERROR,
          message: errorMessage.UnknownFollowCheck,
        })
      );
    } finally {
      setDisabled(false);
    }
  };

  return (
    <Button
      color="yellow_line"
      onClick={handleClickFollowButton}
      disabled={disabled}
    >
      {followState}
    </Button>
  );
};

FollowButton.ErrorFallback = FollowButtonErrorFallback;
FollowButton.FallbackLoading = FollowButtonLoading;

export default FollowButton;
