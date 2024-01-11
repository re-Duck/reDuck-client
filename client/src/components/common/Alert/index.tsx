import React, { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeAlert } from '@/lib/redux/slices/alertSlice';
import { alertSelector } from '@/lib/redux/slices/alertSlice';

// components
import AlertIcon from './alert-icon';
import AlertWrapper from './alert-wrapper';
import { Icon } from '@iconify/react';

// constants
import { AlertType, iconInfo } from '@/constants/constant';

export default function Alert() {
  const { type, message } = useSelector(alertSelector);
  const dispatch = useDispatch();

  const typeColor = useMemo(() => {
    if (type === AlertType.CLOSE) {
      return '';
    } else {
      const { color } = iconInfo[type];
      return color;
    }
  }, [type]);

  const handleAlertClose = () => {
    dispatch(closeAlert());
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (type !== AlertType.CLOSE) {
      // 3초 후에 Alert 자동으로 닫힘
      timer = setTimeout(() => {
        dispatch(closeAlert());
      }, 3000);
    }

    return () => {
      // 컴포넌트가 언마운트되거나 업데이트되기 전에 타이머 정리
      clearTimeout(timer);
    };
  }, [type, dispatch]);

  return (
    <>
      {type !== AlertType.CLOSE && (
        <AlertWrapper color={typeColor}>
          <div className="flex gap-2 items-center">
            <AlertIcon type={type} />
            <p>{message}</p>
          </div>
          <Icon
            icon="material-symbols:close"
            fontSize={24}
            className="absolute right-0"
            onClick={handleAlertClose}
          />
        </AlertWrapper>
      )}
    </>
  );
}
