// service
import { axios_post } from '../base/api';

interface PropType {
  data: {
    email: string;
  };
  accessToken: string;
}

export default async function sendProfileEmail({
  data,
  accessToken,
}: PropType) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const suburl = '/auth/email/profile/number';
  const result = await axios_post({ suburl, data, headers });

  if (!result.isOkay) {
    throw new Error(result.error);
  }
}
