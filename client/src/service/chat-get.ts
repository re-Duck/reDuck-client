// api
import { axios_get } from './base/api';

// types
import { IChatMessage, IUserInfo, IChatUserDto } from '@/types';

const getRecommandUser = async () => {
  const suburl = '/chat/random';

  const response = await axios_get({ suburl });
  const data = response.data;

  return data as Pick<
    IUserInfo,
    'userId' | 'name' | 'company' | 'developAnnual' | 'userProfileImgPath'
  >[];
};

const getUserChatRoom = async ({
  userId,
  token,
}: {
  userId?: string;
  token?: string;
}): Promise<IChatUserDto[]> => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const suburl = `/chat/rooms/${userId}`;

  const response = await axios_get({ suburl, headers });
  if (response.isOkay) {
    const data = response.data;

    return data as IChatUserDto[];
  } else {
    return [];
  }
};

interface ResponseTypeRoomChat {
  chatMessages: IChatMessage[];
}

const getRoomChat = async ({
  roomId,
  token,
  messageId,
}: {
  roomId: string;
  token: string;
  messageId: string;
}) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const suburl = `/chat/room/${roomId}`;
  const params = messageId
    ? {
        messageId,
      }
    : {};

  const response = await axios_get({ suburl, headers, params });
  const data = response.data;

  const { chatMessages } = data as ResponseTypeRoomChat;
  const nextPageParam =
    chatMessages.length > 0
      ? chatMessages[chatMessages.length - 1].messageId
      : null;

  return { chatMessages, nextPageParam };
};

export { getRecommandUser, getUserChatRoom, getRoomChat };
