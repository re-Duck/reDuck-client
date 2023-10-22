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
  const Style = {
    my: {
      wrapper: 'ml-auto mr2 flex-row-reverse',
      box: 'text-right',
      messageWrapper: 'flex-row-reverse',
      message: 'bg-indigo-500 rounded-tr-none ml-auto',
    },
    other: {
      wrapper: 'mr-auto ml-2',
      box: 'text-left',
      messageWrapper: 'flex-row',
      message: 'bg-slate-500 rounded-tl-none',
    },
  };
  const time = formatDateToHHMM(messageTime);
  return (
    <div className={`flex ${Style[type].wrapper} items-end gap-1 max-w-[50%]`}>
      {type === 'other' && (
        <div className="self-baseline">
          <Avatar
            src={userProfileImgPath ? `${BASE_URL}${userProfileImgPath}` : ''}
            alt="프로필 이미지"
            size="xs"
          />
        </div>
      )}
      <div className={Style[type].box}>
        <span>{name}</span>
        <div className={`flex items-end gap-2 ${Style[type].messageWrapper}`}>
          <div
            className={`w-fit p-2 text-white rounded-xl ${Style[type].message}`}
          >
            <span>{message}</span>
          </div>
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
}
