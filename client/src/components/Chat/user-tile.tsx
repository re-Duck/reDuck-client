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

// utils
import { formatDateToString } from '@/util';

interface IUserTile {
  roomId?: string;
  enteredRoomId: string;
  src?: string;
  token?: string;
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
  enteredRoomId,
  src,
  token,
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
        roomId,
        token,
      });
      const { roomId: id, chatMessages } = data;
      chatMessages.reverse();
      handleEnterRoom(id, chatMessages);
    } else {
      const otherIds = [userId];
      const result = await createChatRoom({
        otherIds,
        roomName: '',
        token,
      });
      const { isOkay, data } = result;
      const { chatMessages, roomId } = data;
      chatMessages.reverse();
      if (isOkay) {
        handleEnterRoom(roomId, chatMessages);
      }
    }
  };

  const selectedStyle = enteredRoomId === roomId && 'bg-gray-300';

  return (
    <div
      className={`flex gap-2 font-semibold items-center px-2 py-4 ${selectedStyle}`}
      onDoubleClick={handleRoomCheck}
    >
      <Avatar src={src ? `${BASE_URL}${src}` : ''} alt="user_icon" size="sm" />
      <div className="flex flex-1 flex-col text-left overflow-hidden">
        <span className="text-md">{name}</span>
        <span className="text-xs text-gray-400 truncate overflow-ellipsis">
          {description}
        </span>
      </div>
      <div className="disabled:opacity-70 w-8 h-8 sm:w-14 sm:h-10 inline-block">
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
            <p className="text-sm text-slate-400">
              {formatDateToString(lastChatMessageTime as string)}
            </p>
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
