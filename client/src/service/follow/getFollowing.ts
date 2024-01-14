// service
import { axios_get } from '../base/api';

// types
import { IUserState } from '@/types/redux/IUserState';

interface IFollowUser extends Pick<IUserState, 'userId' | 'userName'> {
  profileImg: string;
}

interface IRawData {
  data: IFollowUser[];
  status: string;
  message: string;
}

export default async function getFollowing({ userId }: { userId: string }) {
  const suburl = `/follow/followings/${userId}`;

  const result = await axios_get({ suburl });

  if (!result.isOkay) {
    throw new Error(result.error);
  }

  const rawData = result.data as IRawData;

  return rawData.data;
}
