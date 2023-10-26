// service
import { axios_delete } from '../base/api';

export default async function deleteUser(accessToken: string) {
  const suburl = '/user';
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const result = await axios_delete({ suburl, headers });

  if (!result.isOkay) {
    throw new Error(result.error);
  }
}
