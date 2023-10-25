// services
import { makeJsonToBlob } from '@/util';
import { axios_post, axios_put } from './base/api';
import { IUserInfo } from '@/types';

interface IEditProfile {
  isOkay: boolean;
  data?: IUserInfo;
  code: 'INVALID_PASSWORD' | 'UNAUTHENTICATED_EMAIL' | '';
}

export async function editProfile({
  data,
  userId,
  accessToken,
}: {
  data: {
    modifyUserDto: object;
    file: Blob | null;
  };
  userId: string;
  accessToken?: string;
}): Promise<IEditProfile> {
  const headers = {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${accessToken}`,
  };
  const suburl = `/user/${userId}`;
  const formData = new FormData();
  const modifyUserDto = makeJsonToBlob(data.modifyUserDto);
  formData.append('modifyUserDto', modifyUserDto);
  if (data.file !== null) {
    formData.append('file', data.file);
  } else {
    formData.append('file', new Blob());
  }

  const result = await axios_put<any>({ suburl, data: formData, headers });
  if (result.isOkay) {
    return {
      isOkay: result.isOkay,
      data: result.data,
      code: '',
    };
  } else {
    return {
      isOkay: result.isOkay,
      code: result.data.code,
    };
  }
}
