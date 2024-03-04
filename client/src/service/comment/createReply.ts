import { v4 as uuidv4 } from 'uuid';

import { axios_post } from '../base/api';

interface IProps {
  content: string;
  parentCommentOriginId: string;
  postOriginId: string;
}

export default async function createReply({
  content,
  parentCommentOriginId,
  postOriginId,
}: IProps) {
  const commentOriginId = uuidv4();
  const suburl = '/comments/posts/reply';

  const data = {
    content,
    postOriginId,
    commentOriginId,
    parentCommentOriginId,
  };

  const result = await axios_post({ suburl, data });

  if (!result.isOkay) {
    throw new Error(result.error);
  }
}
