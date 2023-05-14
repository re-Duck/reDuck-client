// 게시글 id 생성
import { v4 as uuidv4 } from 'uuid';

// service
import { axios_post } from './base/api';

export async function boardPost(title: string, content: string): Promise<void> {
  const postOriginId = uuidv4();
  const suburl = '/post';
  const headers = {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
  };

  const data = {
    title,
    content,
    postOriginId,
    userId: 'reduck',
    postType: 'qna',
  };

  const result = await axios_post({ suburl, headers, data });

  if (!result.isOkay) {
    alert(result.message);
  }
}
