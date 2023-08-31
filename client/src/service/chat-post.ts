// third-party
import { v4 } from 'uuid';

// base
import { axios_post } from './base/api';

interface ICreateChatRoom {
  otherIds: string[];
  roomName?: string;
  accessToken: string;
}

const createChatRoom = async ({
  otherIds,
  roomName,
  accessToken,
}: ICreateChatRoom) => {
  const suburl = '/chat/room';
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const roomId = v4();
  const data = {
    roomId,
    otherIds,
    roomName,
  };

  // TODO: roomId 수정

  const result = await axios_post({ suburl, headers, data });

  return result;
};

export { createChatRoom };
