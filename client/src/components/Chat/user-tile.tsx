// react, next
import React from 'react';

// components
import { Avatar, Icon } from '../';

// services
import { createChatRoom } from '@/service/chat-post';
import { getRoomChat } from '@/service/chat-get';
import { BASE_URL } from '@/service/base/api';

// types
import { IChatMessage } from '@/types';

interface IUserTile {
  roomId?: string;
  src?: string;
  accessToken: string;
  userId: string;
  name?: string;
  description: string;
  handleEnterRoom: (roomId: string, chatMessages: IChatMessage[]) => void;
  type: 'recommand' | 'room';
  lastChatMessageTime?: string;
  unReadMessageCount?: number;
}

const UserTile = ({
  roomId,
  src,
  accessToken,
  userId,
  name,
  description,
  handleEnterRoom,
  type,
  lastChatMessageTime,
  unReadMessageCount,
}: IUserTile) => {
  const handleRoomCheck = async () => {
    if (type === 'room') {
      const data = await getRoomChat({
        roomId: roomId as string,
        accessToken,
      });
      const { roomId: id, chatMessages } = data;
      handleEnterRoom(id, chatMessages);
    } else {
      const otherIds = [userId];
      const result = await createChatRoom({
        otherIds,
        roomName: '',
        accessToken,
      });
      const { isOkay, data } = result;
      const { chatMessages, roomId } = data;

      if (isOkay) {
        handleEnterRoom(roomId, chatMessages);
      }
    }
  };

  const url = src ? `${BASE_URL}${src}` : ''; // 프로필 이미지

  const formatDateString = () => {
    const currentDate = new Date();
    const targetDate = new Date(lastChatMessageTime as string);

    const diffTime = Math.abs(currentDate.getTime() - targetDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      // 오늘 날짜
      const hours = targetDate.getHours();
      const minutes = targetDate.getMinutes();
      return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    } else if (diffDays === 1) {
      // 어제 날짜
      return '어제';
    } else {
      // 그 외의 경우
      const month = targetDate.getMonth() + 1;
      const day = targetDate.getDate();
      return `${month}월 ${day}일`;
    }
  };

  return (
    <div
      className="flex gap-2 font-semibold items-center mb-4"
      onDoubleClick={handleRoomCheck}
    >
      <Avatar src={url} alt="user_icon" size="sm" />
      <div className="flex flex-col text-left">
        <span className="text-md">{name}</span>
        <span className="text-xs text-gray-400">{description}</span>
      </div>
      <div className="absolute right-0 disabled:opacity-70 w-8 h-8 sm:w-14 sm:h-10 inline-block">
        {type === 'recommand' ? (
          <button className="w-8 sm:w-14 text-right" onClick={handleRoomCheck}>
            <Icon
              name="message-circle"
              size={30}
              strokeWidth={3}
              color="black"
            />
          </button>
        ) : (
          <>
            <p className="text-sm text-slate-400">{formatDateString()}</p>
            {unReadMessageCount !== 0 && (
              <div className="bg-red-500 rounded-full text-white text-sm text-center m-auto w-fit px-2">
                {unReadMessageCount}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserTile;
