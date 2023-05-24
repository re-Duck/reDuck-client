// services
import { axios_get, axios_post } from './base/api';

// util
import { makeJsonToBlob } from '@/util';

interface ISignUpProp {
  signUpDto: object;
  file: Blob | null;
}

interface ICheckEmail {
  status: boolean;
  value: string;
}

export async function SignupPost(data: ISignUpProp): Promise<boolean> {
  const suburl = '/user';
  const formData = new FormData();
  console.log(data);
  const signUpDto = makeJsonToBlob(data.signUpDto);
  formData.append('signUpDto', signUpDto);
  if (data.file !== null) {
    formData.append('file', data.file);
  }
  const headers = {
    'Content-Type': 'multipart/form-data',
  };

  const result = await axios_post({ suburl, data: formData, headers });
  return result.isOkay;
}

export async function checkID(id: string): Promise<object> {
  const suburl = `/user/duplicate/${id}`;

  const result = await axios_get({ suburl });
  if (result.isOkay) {
    return {
      state: true,
      isDuplicate: result.data,
    };
  } else {
    return {
      state: false,
      message: result.message,
    };
  }
}

export async function sendEmail(data: object) {
  const suburl = '/auth/email/user/number';

  const result = await axios_post({ suburl, data });
  return result.isOkay;
}

export async function checkEmail(data: object): ICheckEmail {
  const suburl = '/auth/email/user';

  const result = await axios_post({ suburl, data });
  const value = result.isOkay
    ? result.data.emailAuthToken
    : result.data.message;
  return {
    status: result.isOkay,
    value,
  };
}
