// third-party
import { v4 } from 'uuid';

// base
import { axios_post } from './base/api';

// types
import { IChatMessage } from '@/types';

interface ICreateChatRoom {
  otherIds: string[];
  roomName?: string;
  token?: string;
}

interface ResponseType {
  roomId: string;
  chatMessages: IChatMessage[];
}

const createChatRoom = async ({
  otherIds,
  roomName,
  token,
}: ICreateChatRoom): Promise<ResponseType> => {
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

  const result = await axios_post({
    suburl,
    headers,
    data,
  });

  if (!result.isOkay) {
    throw new Error('채팅방 생성 및 입장 실패');
  } else {
    return result!.data as ResponseType;
  }
};

export { createChatRoom };
