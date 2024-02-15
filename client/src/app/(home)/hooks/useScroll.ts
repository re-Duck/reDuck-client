'use client';

import getAllPosts from '@/service/post/getAllPosts';
import { IPostInformation } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

function useScroll({
  initialData,
  type,
}: {
  initialData?: { data: IPostInformation[]; nextPageParms?: string };
  type: 'stack' | 'qna';
}) {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    ...(!!initialData && initialData),
    queryKey: ['projects'],
    queryFn: ({ pageParam }) => getAllPosts({ postType: type, pageParam }),
    getNextPageParam: (lastPage) => lastPage?.nextPageParms,
    // suspense: true,
  });

  useEffect(() => {
    const position = Number(sessionStorage.getItem('scrollPosition')) || 0;
    if (position > 0) {
      window.scrollTo(0, position);
      sessionStorage.setItem('scrollPosition', '0');
    }
  }, []);

  useEffect(() => {
    const handleScroll = async (event: Event) => {
      if (event.target instanceof Document) {
        const { scrollHeight, scrollTop, clientHeight } = event.target
          .scrollingElement as Element;
        if (!isFetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
          await fetchNextPage();
        }
      }
    };
    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [hasNextPage, isFetching]);

  return { datas: data?.pages, hasNextPage };
}

export default useScroll;
