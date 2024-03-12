import { axios_get } from '../base/api';

import { IFollowStatus } from '@/types';

export default async function checkFollowStatus({
  userId,
}: {
  userId: string;
}) {
  const suburl = `/follow/status/${userId}`;

  const result = await axios_get<IFollowStatus>({ suburl });

  if (!result.isOkay) {
    throw result.error;
  }

  return result.data;
}
