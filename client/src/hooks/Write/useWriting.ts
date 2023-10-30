import { axios_get } from '@/service/base/api';
import { useCallback, useEffect, useState } from 'react';

interface IPreviewPost {
  postTitle: string;
  postContent: string;
}
function useWriting(postOriginId: string) {
  const [initTitle, setInitTitle] = useState('');
  const [content, setContent] = useState('');

  const handleContent = useCallback((value: string) => setContent(value), []);

  const getPostData = async () => {
    const suburl = `/post/detail/${postOriginId}`;
    const res = await axios_get<IPreviewPost>({ suburl });
    if (!res.isOkay) {
      throw new Error('게시글을 불러오는데 실패했습니다.');
    }
    const { postTitle, postContent } = res.data as IPreviewPost;

    setInitTitle(postTitle);
    setContent(postContent);
  };

  useEffect(() => {
    if (!postOriginId) return;
    getPostData();
  }, [postOriginId]);

  return { initTitle, content, handleContent };
}

export default useWriting;
