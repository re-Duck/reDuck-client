import React from 'react';
import { useDispatch } from 'react-redux';
import { openAlert } from '@/lib/redux/slices/alertSlice';

// icon
import { Icon } from '@iconify/react';

// types
import type { FallbackProps } from 'react-error-boundary';

// constants
import { AlertType, errorMessage } from '@/constants/constant';

interface IProp extends FallbackProps {
  error: {
    code: string;
    status: number;
    message: string;
    timestamp: string;
  };
}

export default function FollowButtonErrorFallback({
  error,
  resetErrorBoundary,
}: IProp) {
  const { status } = error;

  const dispatch = useDispatch();

  if (status === 401) {
    const handleClick = () => {
      dispatch(
        openAlert({
          type: AlertType.INFO,
          message: errorMessage.needLogin,
        })
      );
    };
    // 로그인하지 않은 유저
    return (
      <button
        onClick={handleClick}
        className="rounded-md bg-indigo-600 p-2 font-semibold text-pretty text-white text hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 w-20 text-sm sm:w-24 sm:text-base"
      >
        팔로우
      </button>
    );
  }

  dispatch(
    openAlert({
      type: AlertType.ERROR,
      message: errorMessage.UnknownFollowCheck,
    })
  );

  return (
    <button
      onClick={resetErrorBoundary}
      className="rounded-md bg-red-600 p-2 font-semibold text-pretty text-white text hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:opacity-70 w-20 text-sm sm:w-24 sm:text-base"
    >
      <Icon
        icon="fluent-mdl2:people-repeat"
        fontSize={25}
        className="mx-auto"
      />
    </button>
  );
}
