import { axios_get } from '@/service/base/api';
import { useCallback, useState } from 'react';

function useWriting(postOriginId: string) {
  const [initTitle, setInitTitle] = useState('');
  const [content, setContent] = useState('');

  const handleContent = useCallback((value: string) => setContent(value), []);

  const getPostData = async () => {
    const suburl = `/post/detail/${postOriginId}`;
    const res = await axios_get({ suburl });
    const { postTitle, postContent } = res.data;

    setInitTitle(postTitle);
    setContent(postContent);
  };

  return { initTitle, content, handleContent, getPostData };
}

export default useWriting;
