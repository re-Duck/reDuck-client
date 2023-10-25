import React from 'react';
import Image from 'next/image';
import user_icon from '../../../../public/images/user_icon.png';

import { positionStyle, avatarSizeStyle } from '@/styles/styleConstant';

// service
import { BASE_URL } from '@/service/base/api';

interface IAvatarProp {
  src: string;
  alt: string;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  hasDot?: boolean;
  position?: 'topRight' | 'bottomRight' | 'topLeft' | 'bottomLeft';
}

export default function Avatar({
  src,
  alt,
  size = 'sm',
  hasDot = false,
  position,
}: IAvatarProp) {
  const avatarStyle = `relative rounded-full border border-slate-200 ${avatarSizeStyle[size]} max-w-[200px] max-h-[200px] overflow-hidden`;
  return (
    <div className={avatarStyle}>
      <Image
        src={src === `${BASE_URL}` || src === '' ? user_icon : src}
        width={80}
        height={80}
        alt={alt}
        className="object-cover w-full h-full"
      />
      {hasDot && (
        <div
          className={`${
            positionStyle[position!]
          } absolute z-10 bg-white rounded-full p-4`}
        />
      )}
    </div>
  );
}
