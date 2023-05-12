// 게시글 id 생성
import { v4 as uuidv4 } from 'uuid';

// service
import { axios_post } from './base/api';
import { makeJsonToBlob } from '@/util';

export async function boardPost(title: string, blobFile: Blob): Promise<void> {
  const postOriginId = uuidv4();
  const suburl = '/post';
  const headers = {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyZWR1Y2siLCJyb2xlcyI6W3sibmFtZSI6IlJPTEVfVVNFUiJ9XSwiaWF0IjoxNjgzOTAxMDczLCJleHAiOjE2ODM5ODc0NzN9.DfSNToZubPJV1KqUb88PbTE-uJPiOSlnDbhjtA05hk0`,
  };

  const formData = new FormData();
  const postDto = {
    title,
    postOriginId,
    userId: 'reduck',
    postType: 'qna',
  };
  const blobPostDto = makeJsonToBlob(postDto);

  formData.append('postDto', blobPostDto);
  formData.append('file', blobFile);

  const result = await axios_post({ suburl, headers, data: formData });

  if (!result.isOkay) {
    alert(result.message);
  }
}
