import { axios_get } from './base/api';

const getRecommandUser = async () => {
  const suburl = '/chat/random';

  const response = await axios_get({ suburl });
  const data = response.data;

  return data;
};

const getUserChatRoom = async ({
  userId,
  accessToken,
}: {
  userId: string;
  accessToken: string;
}) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const suburl = `/chat/rooms/${userId}`;

  const response = await axios_get({ suburl, headers });
  const data = response.data;

  return data;
};

export { getRecommandUser, getUserChatRoom };
