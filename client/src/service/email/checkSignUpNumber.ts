// service
import { axios_post } from '../base/api';

interface PropType {
  email: string;
  number: number;
}

interface ResponseDataType {
  emailAuthToken: string;
}

export default async function checkSignUpNumber({ email, number }: PropType) {
  const suburl = '/auth/email/user';

  const data = { email, number, type: 'USER' };

  const result = await axios_post({ suburl, data });

  if (!result.isOkay) {
    throw new Error(result.error);
  }

  const { emailAuthToken } = result.data as ResponseDataType;

  return emailAuthToken;
}
