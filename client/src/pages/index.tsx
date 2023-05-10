import React, { useEffect } from 'react';
import Head from 'next/head';

import { Post, Advertisement, Layout } from '@/components';
import { WritePostButton } from '@/components/WritePostButton';

//@tanstack/react-query
import { useInfiniteQuery } from '@tanstack/react-query';
import { getAllPosts } from '@/service/getPosts';
import { Icon } from '@iconify/react';

export default function Home() {
  const { data, fetchNextPage, hasNextPage, isFetching, status } =
    useInfiniteQuery({
      queryKey: ['projects'],
      queryFn: getAllPosts,
      getNextPageParam: (lastPage, pages) => lastPage?.nextPageParms,
    });
  const IS_LOADING = status === 'loading';

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
  }, [fetchNextPage, hasNextPage]);
  console.log('data', data);
  return (
    <>
      <Head>
        <title>reDuck</title>
        <meta name="description" content="reDuck site" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className=" mx-auto flex justify-between max-w-5xl">
          <div className="flex flex-col w-full md:w-8/12 border-gray-100 border-[1px] gap-3">
            <WritePostButton />

            {IS_LOADING ? (
              <div className="flex flex-col items-center">
                <div>Loading...</div>
                <Icon
                  icon="line-md:loading-loop"
                  style={{ fontSize: '65px' }}
                />
              </div>
            ) : (
              <>
                {data?.pages.map((group, i) => (
                  <React.Fragment key={i}>
                    {group?.data.map((props) => {
                      return <Post key={props.postOriginId} {...props} />;
                    })}
                  </React.Fragment>
                ))}

                <div className="flex justify-center">
                  {hasNextPage && (
                    <Icon
                      icon="line-md:loading-loop"
                      style={{ fontSize: '40px' }}
                    />
                  )}
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
