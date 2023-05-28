// services
import { axios_post, axios_put } from './base/api';

export async function editProfile({
  data,
  userId,
}: {
  data: object;
  userId: string;
}) {
  const suburl = `user/${userId}`;

  const result = await axios_put({ suburl, data });
  return;
}

export async function sendEditEmail({
  data,
  type,
}: {
  data: object;
  type: string;
}) {
  const suburl =
    type === 'user' ? 'auth/email/user/number' : 'auth/email/number';

  const result = await axios_post({ suburl, data });
  return result.isOkay;
}
