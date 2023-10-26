// service
import { axios_put } from '../base/api';

// util
import { makeJsonToBlob } from '@/util';

// type
import { IUserInfo } from '@/types';

interface PropType {
  data: {
    modifyUserDto: object;
    imgFile: Blob | null;
  };
  userId: string;
  accessToken: string;
}

export default async function updateUser({
  data,
  userId,
  accessToken,
}: PropType): Promise<IUserInfo> {
  const { modifyUserDto, imgFile } = data;

  const headers = {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${accessToken}`,
  };
  const suburl = `/user/${userId}`;

  const modifyUserDtoBlob = makeJsonToBlob(modifyUserDto);

  const formData = new FormData();
  formData.append('modifyUserDto', modifyUserDtoBlob);
  formData.append('file', imgFile || new Blob());

  const result = await axios_put<IUserInfo>({
    suburl,
    data: formData,
    headers,
  });

  if (result.isOkay) {
    return result.data as IUserInfo;
  } else {
    throw new Error(result.error);
  }
}
