// services
import { axios_get, axios_post } from './base/api';

// util
import { makeJsonToBlob } from '@/util';

import { ICheckID, ISignupData } from '@/types';

interface singupDto extends ISignupData {
  emailAuthToken: string;
}

interface ISignUpProp {
  signUpDto: singupDto;
  file: Blob | null;
}

export async function SignupPost(data: ISignUpProp): Promise<boolean> {
  const suburl = '/user';
  const formData = new FormData();
  const signUpDto = makeJsonToBlob(data.signUpDto);
  formData.append('signUpDto', signUpDto);
  if (data.file !== null) {
    formData.append('file', data.file);
  } else {
    formData.append('file', new Blob());
  }
  const headers = {
    'Content-Type': 'multipart/form-data',
  };

  const result = await axios_post({ suburl, data: formData, headers });
  return result.isOkay;
}

export async function checkID(id: string): Promise<ICheckID> {
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

export async function checkEmail(data: object) {
  const suburl = '/auth/email/user';

  const result = await axios_post({ suburl, data });
  return {
    isOkay: result.isOkay,
    data: result.data,
  };
}
