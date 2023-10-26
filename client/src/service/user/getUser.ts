// service
import { axios_get } from '../base/api';

// types
import { IUserInfo } from '@/types';

export default async function getUser(id: string) {
  const suburl = `/user/${id}`;

  const result = await axios_get({ suburl });

  if (!result.isOkay) {
    throw new Error(result.error);
  }

  return result.data as IUserInfo;
}
