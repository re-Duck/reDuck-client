import { axios_get } from './base/api';

const getRecommandUser = async () => {
  const suburl = '/chat/random';

  const response = await axios_get({ suburl });
  const data = response.data;

  return data;
};

const getUserChatRoom = async ({
  userId,
  token,
}: {
  userId?: string;
  token?: string;
}) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const suburl = `/chat/rooms/${userId}`;

  const response = await axios_get({ suburl, headers });
  if (response.isOkay) {
    const data = response.data;

    return data;
  } else {
    return null;
  }
};

const getRoomChat = async ({
  roomId,
  token,
}: {
  roomId?: string;
  token?: string;
}) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const suburl = `/chat/room/${roomId}`;

  const response = await axios_get({ suburl, headers });
  const data = response.data;

  return data;
};

export { getRecommandUser, getUserChatRoom, getRoomChat };
