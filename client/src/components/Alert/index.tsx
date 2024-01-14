'use client';

import React, { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  alertSelector,
  closeAlert,
} from '@/lib/redux/features/alert/alertSlice';

// components
import AlertIcon from './alert-icon';
import { Icon } from '@iconify/react';

// constants
import { AlertType, iconInfo } from '@/constants/constant';

export default function Alert() {
  const { type, message } = useSelector(alertSelector);
  const dispatch = useDispatch();

  const borderColor = useMemo(() => {
    if (type === AlertType.CLOSE) {
      return '';
    } else {
      const { color } = iconInfo[type];
      return color === 'red'
        ? 'border-red-300'
        : color === 'orange'
        ? 'border-orange-300'
        : color === 'green'
        ? 'border-green-300'
        : 'border-cyan-300';
    }
  }, [type]);

  const handleAlertClose = () => {
    dispatch(closeAlert());
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (type !== AlertType.CLOSE) {
      timer = setTimeout(() => {
        dispatch(closeAlert());
      }, 2500);
    }

    return () => clearTimeout(timer);
  }, [type, dispatch]);

  return (
    <>
      {type !== AlertType.CLOSE && (
        <div
          className={`${borderColor} border fixed w-11/12 h-fit p-6 top-auto right-0 left-0 mx-auto bottom-2 z-20 rounded-lg bg-white sm:top-3 sm:right-3 sm:left-auto sm:mx-0 sm:w-fit`}
        >
          <div className="relative inline-flex w-full pr-8">
            <div className="flex items-center gap-2">
              <AlertIcon type={type} />
              <p>{message}</p>
            </div>
            <Icon
              icon="material-symbols:close"
              fontSize={24}
              className="absolute right-0"
              onClick={handleAlertClose}
            />
          </div>
        </div>
      )}
    </>
  );
}
