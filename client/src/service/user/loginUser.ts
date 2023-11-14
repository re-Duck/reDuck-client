// service
import axios from 'axios';
import { axios_post } from '../base/api';

interface PropType {
  data: { userId: string; password: string };
}

interface ReturnDataType {
  userId: string;
  name: string;
  email: string;
  userProfileImgPath: string;
  accessToken: string;
  refreshToken: string;
}

export default async function loginUser({ data }: PropType) {
  const suburl = '/login';
  const response = await axios_post({ suburl, data });

  if (!response.isOkay) {
    throw new Error(response.error.code);
  }
  const {
    userId,
    name: userName,
    userProfileImgPath,
    accessToken,
    refreshToken,
  } = response.data as ReturnDataType;

  // 쿠키 설정
  try {
    await fetch('/api/setToken', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  } catch {
    throw new Error('Temporary Error');
  }
  // axios default header 설정
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

  return { userId, userName, userProfileImgPath };
}
