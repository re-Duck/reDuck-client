import React from 'react';
import Head from 'next/head';

import { Post, Advertisement, Layout } from '@/components';
import { postList } from '@/constant';

import { useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';

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
  const { data: session, status } = useSession();
  console.log(session);
  // let auth = useSelector((state) => {
  //   return state.auth;
  // });
  // console.log(auth);

  return (
    <>
      <Head>
        <title>reDuck</title>
        <meta name="description" content="reDuck site" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className=" mx-auto flex justify-betwee gap-4 max-w-5xl">
          <div className="flex flex-col w-full md:w-8/12 border-gray-100 border-2 gap-3">
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
