// service
import { axios_get } from '../base/api';

// types
import { IUserState } from '@/types/redux/IUserState';

interface IFollowUser extends Pick<IUserState, 'userId' | 'userName'> {
  profileImg: string;
}

export default async function getFollowing({ userId }: { userId: string }) {
  const suburl = `/follow/followings/${userId}`;

  const result = await axios_get<IFollowUser[]>({ suburl });

  if (!result.isOkay) {
    throw new Error(result.error);
  }

  return result.data;
}
