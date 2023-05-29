/* eslint-disable react/prop-types */
import React from 'react';
import { Icon } from '@iconify/react';

export default function LoadingIcon({ size = '25px' }) {
  return <Icon icon="line-md:loading-loop" style={{ fontSize: size }} />;
}
