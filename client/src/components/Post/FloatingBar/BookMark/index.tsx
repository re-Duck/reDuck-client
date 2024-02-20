'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { openAlert } from '@/lib/redux/features/alert/alertSlice';

// icons
import SaveIcon from '@/assets/Icon/save';

// services
import { scrapManager } from '@/service/scrap';

// constant
import { AlertType, errorMessage, successMessage } from '@/constants/constant';

export default function FloatingBarBookMark({
  postOriginId,
}: {
  postOriginId: string;
}) {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isScrap, setIsScrap] = useState(false);

  const checkInitialScrap = async () => {
    setIsLoading(true);
    try {
      const isScrap = await scrapManager.getIsScrapPost({ postOriginId });
      setIsScrap(isScrap);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = async () => {
    if (isLoading) {
      return;
    }
    try {
      await scrapManager.updateScrapPost({ postOriginId });
      if (!isScrap) {
        dispatch(
          openAlert({
            type: AlertType.SUCCESS,
            message: successMessage.scrapSuccess,
          })
        );
      }
      setIsScrap((prev) => !prev);
    } catch (error) {
      console.error(error);
      dispatch(
        openAlert({
          type: AlertType.ERROR,
          message: errorMessage.Unknown,
        })
      );
    }
    // TODO: 저장되었다는 토스트 메세지 및 서비스 로직 추가
  };

  useEffect(() => {
    checkInitialScrap();
  }, []);

  return (
    <div className="flex justify-center py-[18px] bg-gray-scale-50 shadow-[inset_0px_-2px] shadow-gray-scale-200">
      <SaveIcon
        fill={isScrap ? '#222222' : 'none'}
        onClick={handleClick}
        stroke={isScrap ? '#222222' : '#A1A1A1'}
        className="hover:cursor-pointer text-gray-scale-600"
      />
    </div>
  );
}
