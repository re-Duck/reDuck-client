// services
import { axios_post } from '../base/api';

// types
import { EmailType } from '@/types';

interface PropType {
  email: string;
  type: EmailType;
  number: number;
}

interface ResponseDataType {
  emailAuthToken: string;
}

export default async function checkProfileEmailNumber(data: PropType) {
  const suburl = '/auth/email/profile';

  const result = await axios_post<ResponseDataType>({ suburl, data });

  if (!result.isOkay) {
    throw new Error(result.error);
  }

  const { emailAuthToken } = result.data as ResponseDataType;

  return emailAuthToken;
}
