import React from 'react';
import { positionStyle, avatarSizeStyle } from '@/styles/styleConstant';

interface IAvatarProp {
  src: string | null;
  alt: string;
  size: 'sm' | 'md' | 'lg';
  hasDot?: boolean;
  position?: 'topRight' | 'bottomRight' | 'topLeft' | 'bottomLeft';
}

export default function Avatar({
  src,
  alt,
  size = 'sm',
  hasDot,
  position,
}: IAvatarProp) {
  const backgroundColor = src ? '' : 'bg-slate-400';
  const avatarStyle = `relative rounded-full ${backgroundColor} border border-slate-200 ${avatarSizeStyle[size]} max-w-[200px] max-h-[200px] overflow-hidden`;
  return (
    <div className={avatarStyle}>
      {src && (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      )}
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
