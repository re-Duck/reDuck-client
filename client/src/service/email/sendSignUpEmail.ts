// service
import { axios_post } from '../base/api';

interface PropType {
  email: string;
}

export default async function sendSignUpEmail(data: PropType) {
  const suburl = '/auth/email/user/number';

  const result = await axios_post({ suburl, data });

  if (!result.isOkay) {
    throw new Error(result.error);
  }
}
