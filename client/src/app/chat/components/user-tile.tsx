'use client';

// react, next
import React from 'react';

// components
import { Icon } from '@iconify/react';
import { Avatar } from '@/components';

// hooks
import useModal from '@/hooks/modal/useModal';

// services
import { createChatRoom } from '@/service/chat-post';
import { BASE_URL } from '@/service/base/api';

// utils
import { formatDateToString } from '@/util';

// types
import { IChatRoomInfo } from '@/types';

// constant
import { ModalType, errorMessage } from '@/constants/constant';

interface IUserTile {
  roomId?: string;
  enteredRoomId: string;
  src?: string;
  userId: string;
  name: string;
  description: string;
  handleEnterRoom: (roomInfo: IChatRoomInfo) => void;
  type: 'recommand' | 'room';
  lastChatMessageTime?: string;
  unReadMessageCount?: number;
}

const UserTile = ({
  roomId,
  enteredRoomId,
  src,
  userId,
  name,
  description,
  handleEnterRoom,
  type,
  lastChatMessageTime,
  unReadMessageCount,
}: IUserTile) => {
  const { openModal } = useModal();

  const handleClick = async () => {
    if (type === 'room') {
      handleEnterRoom({ roomId: roomId as string, roomName: name });
    }
  };

  const handleRecommandChatStart = async () => {
    const otherIds = [userId];
    try {
      const data = await createChatRoom({
        otherIds,
        roomName: name,
      });
      const { roomId, roomName } = data;
      handleEnterRoom({ roomId, roomName });
    } catch {
      openModal({
        type: ModalType.ERROR,
        message: errorMessage.failedCreateChatRoom,
      });
    }
  };

  const addedStyle = `${type === 'room' && 'hover:cursor-pointer'} ${
    enteredRoomId === roomId && 'bg-gray-300'
  }`;

  return (
    <div
      className={`flex gap-2 font-semibold items-center px-2 py-4 ${addedStyle}`}
      onClick={handleClick}
    >
      <Avatar src={src ? `${BASE_URL}${src}` : ''} alt="user_icon" size="sm" />
      <div className="flex flex-col flex-1 overflow-hidden text-left">
        <span className="text-md">{name}</span>
        <span className="text-xs text-gray-400 truncate overflow-ellipsis">
          {description}
        </span>
      </div>
      <div className="inline-block h-10 w-14 disabled:opacity-70">
        {type === 'recommand' ? (
          <button
            className="w-8 text-right sm:w-14"
            onClick={handleRecommandChatStart}
          >
            <Icon icon="lucide:message-circle" fontSize={28} color="black" />
          </button>
        ) : (
          <>
            <p className="text-xs text-slate-400">
              {formatDateToString(lastChatMessageTime as string)}
            </p>
            {unReadMessageCount !== 0 && (
              <div className="px-2 m-auto text-sm text-center text-white bg-red-500 rounded-full w-fit">
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
