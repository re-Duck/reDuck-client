import { axios_get } from '../base/api';

import { IFollowStatus } from '@/types';

interface IRawData {
  data: IFollowStatus;
  status: string;
  message: string;
}

export default async function checkFollowStatus({
  userId,
}: {
  userId: string;
}) {
  const suburl = `/follow/status/${userId}`;

  const result = await axios_get<IRawData>({ suburl });

  if (!result.isOkay) {
    throw result.error;
  }

  const rawData = result.data as IRawData;

  return rawData.data;
}
