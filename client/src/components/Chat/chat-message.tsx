// react, next
import React from 'react';

// components
import { Avatar } from '@/components';

// services
import { BASE_URL } from '@/service/base/api';

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
  const messageStyle =
    type === 'my'
      ? ' bg-indigo-500 rounded-tr-none'
      : ' bg-slate-500 rounded-tl-none';

  // TODO: util로 옮기기
  const foramtDateTime = (messageString: string) => {
    const newDate = new Date(messageString);
    const hours = newDate.getHours().toString().padStart(2, '0');
    const minutes = newDate.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  const time = foramtDateTime(messageTime);
  return (
    <div className={`flex ${wrapperStyle} items-end gap-1`}>
      {type === 'other' && (
        <div className="self-baseline">
          <Avatar
            src={userProfileImgPath ? `${BASE_URL}${userProfileImgPath}` : ''}
            alt="프로필 이미지"
            size="xs"
          />
        </div>
      )}
      <div className={BoxStyle}>
        <span>{name}</span>
        <div className={`w-fit p-2 text-white rounded-xl ${messageStyle}`}>
          <span>{message}</span>
        </div>
      </div>
      <span>{time}</span>
    </div>
  );
}
