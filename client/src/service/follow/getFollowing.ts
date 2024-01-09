// service
import { axios_get } from '../base/api';

export default async function getFollowing({ userId }: { userId: string }) {
  const suburl = `/follow/followings/${userId}`;

  const result = await axios_get({ suburl });

  if (!result.isOkay) {
    throw new Error(result.error);
  }

  return result.data;
}
