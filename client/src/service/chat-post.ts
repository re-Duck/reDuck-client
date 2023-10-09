// third-party
import { v4 } from 'uuid';

// base
import { axios_post } from './base/api';

interface ICreateChatRoom {
  otherIds: string[];
  roomName?: string;
  token?: string;
}

const createChatRoom = async ({
  otherIds,
  roomName,
  token,
}: ICreateChatRoom) => {
  const suburl = '/chat/room';
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const roomId = v4();
  const data = {
    roomId,
    otherIds,
    roomName,
  };

  const result = await axios_post({ suburl, headers, data });

  return result;
};

export { createChatRoom };
