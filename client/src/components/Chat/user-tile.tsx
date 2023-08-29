import React from 'react';

import { Avatar, Icon } from '../';

import { createChatRoom } from '@/service/chat-post';
import { BASE_URL } from '@/service/base/api';

interface IUserTile {
  src?: string;
  accessToken: string;
  userId: string;
  name?: string;
  description: string;
  handleEnterRoom: (data: any) => void;
  type: 'recommand' | 'room';
}

const UserTile = ({
  src,
  accessToken,
  userId,
  name,
  description,
  handleEnterRoom,
  type,
}: IUserTile) => {
  const handleCreateRoom = async () => {
    const otherIds = [userId];
    const result = await createChatRoom({
      otherIds,
      roomName: '',
      accessToken,
    });
    const { isOkay, data, roomId } = result;
    console.log('data', data); //채팅 내역

    if (isOkay) {
      handleEnterRoom(roomId);
    }
    // result로 채팅 내역을 불러옴 (이미 방 있을 때)
  };

  const url = src ? `${BASE_URL}${src}` : ''; // 프로필 이미지

  return (
    <div
      className="flex gap-2 font-semibold items-center mb-4"
      onDoubleClick={() => handleEnterRoom('ㅁ')}
    >
      <Avatar src={url} alt="user_icon" size="sm" />
      <div className="flex flex-col text-left">
        <span className="text-md">{name}</span>
        <span className="text-xs text-gray-400">{description}</span>
      </div>
      {type === 'recommand' ? (
        <button
          className="absolute right-0 disabled:opacity-70 w-8 h-8 sm:w-10 sm:h-10"
          onClick={handleCreateRoom}
        >
          <Icon name="message-circle" size={30} strokeWidth={3} color="black" />
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserTile;
