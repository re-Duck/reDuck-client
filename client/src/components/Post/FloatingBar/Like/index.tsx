'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { openAlert } from '@/lib/redux/features/alert/alertSlice';

// icons
import HeartIcon from '@/assets/Icon/heart';

// service
import { likeManager } from '@/service/like';

// constant
import { AlertType, errorMessage } from '@/constants/constant';

interface IProps {
  postOriginId: string;
  InitialLikes: number;
}

export default function FloatingBarLike({
  postOriginId,
  InitialLikes,
}: IProps) {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [likes, setLikes] = useState(InitialLikes);

  const checkInitialLike = async () => {
    setIsLoading(true);
    try {
      const isLike = await likeManager.getIsLikePost({ postOriginId });
      setIsLike(isLike);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const handleClick = async () => {
    if (isLoading) {
      return;
    }
    try {
      await likeManager.updateLikePost({ postOriginId });

      if (isLike) {
        setLikes((prev) => prev - 1);
      } else {
        setLikes((prev) => prev + 1);
      }
      setIsLike((prev) => !prev);
    } catch (error) {
      // TODO: 상세 에러핸들링
      dispatch(
        openAlert({
          type: AlertType.ERROR,
          message: errorMessage.Unknown,
        })
      );
      console.error(error);
    }
  };

  useEffect(() => {
    checkInitialLike();
  }, []);

  return (
    <div className="flex flex-col items-center py-1.5 mx-[5px] gap-2 px-[5px] bg-gray-scale-50 shadow-[inset_0px_-2px] shadow-gray-scale-200">
      <p className="font-bold text-caption1">{likes}</p>
      <HeartIcon
        className="hover:cursor-pointer"
        fill={isLike ? '#F2415A' : 'none'}
        stroke={isLike ? 'none' : '#A1A1A1'}
        onClick={handleClick}
      />
    </div>
  );
}
