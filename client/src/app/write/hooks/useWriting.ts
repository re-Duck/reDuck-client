'use client';

import { axios_get } from '@/service/base/api';
import { IPostInformation } from '@/types';
import { useCallback, useEffect, useState } from 'react';

function useWriting(postOriginId: string) {
  const [initTitle, setInitTitle] = useState('');
  const [content, setContent] = useState('');
  const [postType, setPostType] = useState<'qna' | 'stack'>('qna');
  const [tags, setTags] = useState<string[]>([]);

  const handleContent = useCallback((value: string) => setContent(value), []);
  const handleTags = useCallback(
    (value: string, type: 'add' | 'remove') => {
      if (tags.length >= 3 && type === 'add') {
        alert('태그는 3개까지만 입력 가능합니다.');
        return;
      }
      type === 'add'
        ? setTags((prev) => [...prev, value])
        : setTags((prev) => prev.filter((tag) => tag !== value));
    },
    [tags]
  );

  const getPostData = useCallback(async () => {
    const suburl = `/post/detail/${postOriginId}`;
    const res = await axios_get<IPostInformation>({ suburl });
    if (!res.isOkay || !res.data) {
      throw new Error('게시글을 불러오는데 실패했습니다.');
    }
    const { postTitle, postContent, postType } = res.data;

    setInitTitle(postTitle);
    setContent(postContent);
    setPostType(postType);
  }, [postOriginId]);

  useEffect(() => {
    if (!postOriginId) return;
    getPostData();
  }, [postOriginId, getPostData]);

  return {
    initTitle,
    content,
    handleContent,
    postType,
    setPostType,
    tags,
    handleTags,
  };
}

export default useWriting;
