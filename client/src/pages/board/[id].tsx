import React from 'react';
import { useRouter } from 'next/router';
import { Layout, PostDetail, Comment } from '@/components';
import Image from 'next/image';

import googleLogo from '../../assets/images/google_logo.png';

export default function PostDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <div className="flex flex-col max-w-4xl m-auto gap-14 mb-4">
        <PostDetail id={id} />
        <h3 className="text-2xl font-bold pl-3">댓글 3</h3>
        <table className="flex flex-col border-gray-100 border-[1px] border-collapse">
          <tr className="flex justify-between items-center gap-1 h-16 bg-white border-gray-100 border-[1px] px-10">
            <Image src={googleLogo} alt="googleLogo" style={{ width: '20px' }} />
            <input
              className=" border-b-gray-200 border-b-[1px] p-2 pl-3 w-9/12"
              placeholder="댓글을 입력해 보세요."
            />
            <button className=" bg-red-400 rounded-lg px-3 py-2 text-white text-xs">등록</button>
          </tr>
          <tr>
            <Comment />
          </tr>
          <tr>
            <Comment />
          </tr>
          <tr>
            <Comment />
          </tr>
        </table>
      </div>
    </Layout>
  );
}
