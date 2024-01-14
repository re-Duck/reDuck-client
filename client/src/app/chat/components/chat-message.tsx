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
      wrapper: 'ml-auto mr-2 flex-row-reverse',
      box: 'text-right',
      messageWrapper: 'flex-row-reverse',
      message:
        'bg-indigo-500 ml-auto after:right-0 after:border-l-indigo-500 after:border-r-0 after:-mr-2',
    },
    other: {
      wrapper: 'mr-auto ml-2 after:left-0',
      box: 'text-left',
      messageWrapper: 'flex-row',
      message:
        'bg-slate-500 after:left-0 after:border-r-slate-500 after:border-l-0 after:-ml-2',
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
        <div
          className={`relative flex items-end gap-2 ${Style[type].messageWrapper}`}
        >
          <div
            className={`w-fit p-2 text-white text-left rounded-xl ${Style[type].message} after:content-[""] after:absolute after:top-[40%] after:w-0 after:h-0 after:border-8 after:border-solid after:border-transparent after:border-t-0 after:-mt-1`}
          >
            <span>{message}</span>
          </div>
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
}
