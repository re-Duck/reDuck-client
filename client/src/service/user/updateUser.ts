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
}

export default async function updateUser({
  data,
  userId,
}: PropType): Promise<IUserInfo> {
  const { modifyUserDto, imgFile } = data;

  const suburl = `/user/${userId}`;

  const modifyUserDtoBlob = makeJsonToBlob(modifyUserDto);

  const formData = new FormData();
  formData.append('modifyUserDto', modifyUserDtoBlob);
  formData.append('file', imgFile || new Blob());

  const result = await axios_put<IUserInfo>({
    suburl,
    data: formData,
  });

  if (result.isOkay) {
    return result.data as IUserInfo;
  } else {
    throw new Error(result.error.code);
  }
}
