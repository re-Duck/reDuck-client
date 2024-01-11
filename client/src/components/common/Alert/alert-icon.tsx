import React from 'react';

// icon
import { Icon } from '@iconify/react';

// types
import { AlertType, iconInfo } from '@/constants/constant';

interface IProp {
  type:
    | AlertType.SUCCESS
    | AlertType.WARNING
    | AlertType.INFO
    | AlertType.ERROR;
}

const AlertIcon = ({ type }: IProp) => {
  const { color, shape } = iconInfo[type];
  return <Icon icon={shape} color={color} fontSize={24} className="shrink-0" />;
};

export default AlertIcon;
