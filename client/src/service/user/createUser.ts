// service
import { axios_post } from '../base/api';

// util
import { makeJsonToBlob } from '@/util';

// types
import { ISignupData } from '@/types';

interface signUpDto extends ISignupData {
  emailAuthToken: string;
}

interface PropType {
  signUpDto: signUpDto;
  imgFile: Blob | null;
}

export default async function createUser({ signUpDto, imgFile }: PropType) {
  const suburl = '/user';

  const signUpDtoBlob = makeJsonToBlob(signUpDto);

  const formData = new FormData();
  formData.append('signUpDto', signUpDtoBlob);

  formData.append('file', imgFile || new Blob());

  const headers = {
    'Content-Type': 'multipart/form-data',
  };

  const result = await axios_post({ suburl, data: formData, headers });

  if (!result.isOkay) {
    throw new Error(result.error);
  }
}
