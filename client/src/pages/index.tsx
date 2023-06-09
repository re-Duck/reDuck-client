import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';

//components
import { Post, Advertisement, Layout } from '@/components';
import { WritePostButton } from '@/components/WritePostButton';

//@tanstack/react-query
import { useInfiniteQuery } from '@tanstack/react-query';
import { getAllPosts } from '@/service/get-posts';

import LoadingIcon from '@/components/LoadingIcon';
import { IPostInformation } from '@/types';

export default function Home() {
  // TODO: 유저정보 필요시 사용
  // const auth = useSelector((state: any) => state.auth);
  const { data, fetchNextPage, hasNextPage, isFetching, status } =
    useInfiniteQuery({
      queryKey: ['projects'],
      queryFn: getAllPosts,
      getNextPageParam: (lastPage) => lastPage?.nextPageParms,
    });
  const IS_LOADING = status === 'loading';

  useEffect(() => {
    const position = Number(sessionStorage.getItem('scrollPosition')) || 0;
    if (position > 0) {
      window.scrollTo(0, position);
      sessionStorage.setItem('scrollPosition', '0');
    }
  }, []);

  useEffect(() => {
    const handleScroll = async (e: any) => {
      const { scrollHeight, scrollTop, clientHeight } =
        e.target.scrollingElement;
      if (!isFetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
        await fetchNextPage();
      }
    };
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [hasNextPage, isFetching]);

  return (
    <>
      <Layout>
        <div className=" mx-auto flex justify-between max-w-5xl">
          <div className="flex flex-col w-full md:w-8/12 gap-3">
            <WritePostButton />

            {IS_LOADING ? (
              <div className="flex flex-col items-center">
                <div>Loading...</div>
                <LoadingIcon size="65px" />
              </div>
            ) : (
              <>
                {data?.pages.map((group, i) => (
                  <React.Fragment key={i}>
                    {group?.data.map((props: IPostInformation) => (
                      <Post key={props.postOriginId} {...props} />
                    ))}
                  </React.Fragment>
                ))}

                <div className="flex justify-center">
                  {hasNextPage && <LoadingIcon size="40px" />}
                </div>
              </>
            )}
          </div>
          <Advertisement />
        </div>
      </Layout>
    </>
  );
}
