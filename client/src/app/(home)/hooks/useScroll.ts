'use client';

import getAllPosts from '@/service/post/getAllPosts';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

function useScroll() {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['projects'],
    queryFn: getAllPosts,
    getNextPageParam: (lastPage) => lastPage?.nextPageParms,
    suspense: true,
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
