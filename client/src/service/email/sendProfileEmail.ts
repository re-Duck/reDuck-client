// service
import { axios_post } from '../base/api';

interface PropType {
  email: string;
}

export default async function sendProfileEmail(data: PropType) {
  const suburl = '/auth/email/profile/number';
  const result = await axios_post({ suburl, data });

  if (!result.isOkay) {
    throw new Error(result.error);
  }
}
