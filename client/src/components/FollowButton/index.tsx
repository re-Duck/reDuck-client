import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { openAlert } from '@/lib/redux/features/alert/alertSlice';

// assets
import { MoreIcon } from '@/assets/Icon';

// components
import Button from '../base/Button';
import FollowButtonErrorFallback from './FollowButtonErrorFallback';
import FollowButtonLoading from './FollowButtonLoading';

// hooks
import useModal from '@/hooks/modal/useModal';

// services
import { followManager } from '@/service/follow';

// types
import {
  AlertType,
  ModalType,
  errorMessage,
  warningMessage,
} from '@/constants/constant';

type TFollowState = '팔로우' | '팔로잉' | '언팔로우';

const FollowButton = ({ userId }: { userId: string }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { openModal } = useModal();

  const { data } = useQuery({
    queryKey: ['followStatus', userId],
    queryFn: () => followManager.checkFollowStatus({ userId }),
    retry: 1,
    suspense: true,
    useErrorBoundary: true,
  });
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (followFlag: boolean) => {
      if (followFlag) {
        return followManager.requestFollow({ userId });
      } else {
        return followManager.cancleFollow({ userId });
      }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['followStatus', userId] }),
  });

  const [followState, setFollowState] = useState<TFollowState>(
    data?.isFollowing ? '팔로잉' : '팔로우'
  );

  const handleClickFollowButton = () => {
    mutate(true, {
      onSuccess: () => {
        setFollowState('팔로잉');
      },
      onError: (message) => {
        if (message === '인증되지 않은 사용자입니다.') {
          openModal({
            type: ModalType.WARNING,
            message: warningMessage.needLogin,
            callback: () => router.push('/login'),
          });
          return;
        }
        dispatch(
          openAlert({
            type: AlertType.ERROR,
            message: errorMessage.UnknownFollowCheck,
          })
        );
      },
    });
  };

  const handleClickFollowingButton = () => {
    setFollowState('언팔로우');
  };

  const handleClickUnfollowButton = () => {
    mutate(false, {
      onSuccess: () => {
        setFollowState('팔로우');
      },
      onError: () => {
        dispatch(
          openAlert({
            type: AlertType.ERROR,
            message: errorMessage.UnknownFollowCheck,
          })
        );
      },
    });
  };

  if (followState === '팔로잉') {
    return (
      <Button color="blue_gray_line" onClick={handleClickFollowingButton}>
        <span>팔로잉</span>
      </Button>
    );
  } else if (followState === '언팔로우') {
    return (
      <Button color="red_line" onClick={handleClickUnfollowButton}>
        <span>언팔로우</span>
      </Button>
    );
  } else {
    return (
      <Button color="yellow_line" onClick={handleClickFollowButton}>
        <div className="flex items-center gap-1.5">
          <MoreIcon width={20} height={20} />
          <span>팔로우</span>
        </div>
      </Button>
    );
  }
};

FollowButton.ErrorFallback = FollowButtonErrorFallback;
FollowButton.FallbackLoading = FollowButtonLoading;

export default FollowButton;
