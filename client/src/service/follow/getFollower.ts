// service
import { axios_get } from '../base/api';

import { IUserState } from '@/types/redux/IUserState';
interface IFollowUser extends Pick<IUserState, 'userId' | 'userName'> {
  profileImg: string;
}

export default async function getFollower({ userId }: { userId: string }) {
  const suburl = `/follow/followers/${userId}`;

  const result = await axios_get<IFollowUser[]>({ suburl });

  if (!result.isOkay) {
    throw new Error(result.error);
  }

  return result.data;
}
