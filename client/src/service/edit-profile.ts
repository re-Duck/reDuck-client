// services
import { axios_post, axios_put } from './base/api';

export async function editProfile({
  data,
  userId,
  accessToken,
}: {
  data: object;
  userId: string;
  accessToken: string;
}) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const suburl = `/user/${userId}`;

  const result = await axios_put({ suburl, data, headers });
  return;
}

export async function sendEditEmail({
  data,
  accessToken,
}: {
  data: object;
  accessToken?: string;
}) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const suburl = '/auth/email/profile/number';
  const result = await axios_post({ suburl, data, headers });
  return result.isOkay;
}

export async function certificationNumberCheck({
  data,
  accessToken,
}: {
  data: object;
  accessToken?: string;
}) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const suburl = '/auth/email/profile';

  const result = await axios_post({ suburl, data, headers });
  return result;
}
