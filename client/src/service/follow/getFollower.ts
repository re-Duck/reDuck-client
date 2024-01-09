// service
import { axios_get } from '../base/api';

export default async function getFollower({ userId }: { userId: string }) {
  const suburl = `/follow/followers/${userId}`;

  const result = await axios_get({ suburl });

  if (!result.isOkay) {
    throw new Error(result.error);
  }

  return result.data;
}
