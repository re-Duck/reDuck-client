// services
import { axios_post } from '../base/api';

// types
import { EmailType } from '@/types';

interface PropType {
  data: {
    email: string;
    type: EmailType;
    number: number;
  };
  accessToken: string;
}

interface ResponseDataType {
  emailAuthToken: string;
}

export default async function checkProfileEmailNumber({
  data,
  accessToken,
}: PropType) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const suburl = '/auth/email/profile';

  const result = await axios_post<ResponseDataType>({ suburl, data, headers });

  if (!result.isOkay) {
    throw new Error(result.error);
  }

  const { emailAuthToken } = result.data as ResponseDataType;

  return emailAuthToken;
}
