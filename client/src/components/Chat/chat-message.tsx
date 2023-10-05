// react, next
import React from 'react';

// components
import { Avatar } from '@/components';

// services
import { BASE_URL } from '@/service/base/api';

// utils
import { formatDateToHHMM } from '@/util';

interface IChatMessage {
  type: 'my' | 'other';
  message: string;
  name: string;
  messageTime: string;
  userProfileImgPath?: string;
}

export default function ChatMessage({
  type,
  message,
  name,
  messageTime,
  userProfileImgPath = '',
}: IChatMessage) {
  const wrapperStyle =
    type === 'my' ? 'ml-auto mr-2 flex-row-reverse' : 'mr-auto ml-2';
  const BoxStyle = type === 'my' ? 'text-right' : 'text-left';
  const messageWrapperStyle = type === 'my' ? 'flex-row-reverse' : 'flex-row';
  const messageStyle =
    type === 'my'
      ? ' bg-indigo-500 rounded-tr-none ml-auto'
      : ' bg-slate-500 rounded-tl-none';

  const time = formatDateToHHMM(messageTime);
  return (
    <div className={`flex ${wrapperStyle} items-end gap-1 max-w-[50%]`}>
      {type === 'other' && (
        <div className="self-baseline">
          <Avatar
            src={userProfileImgPath ? `${BASE_URL}${userProfileImgPath}` : ''}
            alt="프로필 이미지"
            size="xs"
          />
        </div>
      )}
      <div className={`${BoxStyle}`}>
        <span>{name}</span>
        <div className={`flex items-end gap-2 ${messageWrapperStyle}`}>
          <div className={`w-fit p-2 text-white rounded-xl ${messageStyle}`}>
            <span>{message}</span>
          </div>
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
}
