'use client';

import React from 'react';

// icon
import { Icon } from '@iconify/react';

// types
import { AlertType, iconInfo } from '@/constants/constant';

interface IProp {
  type: Exclude<AlertType, AlertType.CLOSE>;
}

const AlertIcon = ({ type }: IProp) => {
  const { color, shape } = iconInfo[type];
  return <Icon icon={shape} color={color} fontSize={24} className="shrink-0" />;
};

export default AlertIcon;
