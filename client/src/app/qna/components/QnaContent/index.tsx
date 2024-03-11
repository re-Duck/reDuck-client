'use client';

//react, next
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';

//components
import QnaDetail from '../QnaDetail';
import QnaCommentUpload from '../QnaCommentUpload';
import QnaComment from '../QnaComment';
import Tag from '../Tag';

//types
import { IReduxState } from '@/types/redux/IReduxState';

//services
import { postManager } from '@/service/post';
import { commentManager } from '@/service/comment';
import { IBoardPostInformation } from '@/types';

export default function QnaContent() {
  const user = useSelector((state: IReduxState) => state.auth);
  const params = useParams();

  const { id: postOriginId } = params as { id: string };

  const { data: postData } = useQuery({
    queryKey: [`${postOriginId}`],
    queryFn: () => postManager.getPost({ postOriginId }),
    retry: false,
    suspense: true,
  });

  const { data: postComment } = useQuery({
    queryKey: [`${postOriginId}/comment`],
    queryFn: () => commentManager.getComments({ postOriginId }),
    retry: false,
    suspense: true,
  });

  const IS_POST_AUTHOR = user.userId === postData?.postAuthorId;

  return (
    <div className="flex flex-col flex-1 max-w-[850px]">
      <QnaDetail
        data={postData as IBoardPostInformation}
        IS_AUTHOR={IS_POST_AUTHOR}
      />
      <div className="flex gap-1 py-8 border-b border-gray-scale-500">
        <Tag name="tag" type="normal" />
        <Tag name="tag" type="normal" />
      </div>
      <QnaCommentUpload />
      <QnaComment />
    </div>
  );
}
