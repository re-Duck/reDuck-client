import { axios_delete } from './base/api';

export async function withdrawal(token: string) {
  const suburl = '/user';
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await axios_delete({ suburl, headers });

  return response.isOkay;
}
