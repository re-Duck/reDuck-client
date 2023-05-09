import React, { useEffect } from 'react';
import Head from 'next/head';

import { Post, Advertisement, Layout } from '@/components';
import { postList } from '@/constant';
import { WritePostButton } from '@/components/WritePostButton';

//@tanstack/react-query
import { useInfiniteQuery } from '@tanstack/react-query';
import { getAllPosts } from '@/service/getPosts';

interface IPostList {
  postOriginId: string;
  title: string;
  content: string;
}
interface IHome {
  postList: IPostList[];
}

export default function Home({ postList }: IHome) {
  //TODO : 스크롤 이벤트로 무한 스크롤 구현

  // const LIMIT = 10;
  // useEffect(() => {
  //   getFirstPosts('');
  // }, []);
  const fetchProjects = async ({ pageParam = 0 }) => {
    // const res = await fetch('/api/projects?cursor=' + pageParam);
    // return res.json();
    console.log(pageParam);
    return { nextCursor: 2 };
  };
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['projects'],
    queryFn: getAllPosts,
    getNextPageParam: (lastPage, pages) => lastPage?.nextPageParms,
  });
  console.log(data, hasNextPage);
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
            {hasNextPage && (
              <button onClick={() => fetchNextPage()}>fetch</button>
            )}

            <WritePostButton />
            {postList.map((post) => (
              <Post key={post.postOriginId} id={post.postOriginId} />
            ))}
          </div>
          <Advertisement />
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  //API 요청
  // const res = await fetch('http://localhost:3000/api/post');
  // const postList = await res.json();

  return {
    props: { postList },
  };
}
