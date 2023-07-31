import Layout from '@/components/Layout';
import React from 'react';

export default function Chatroom() {
  return (
    <Layout>
      <div className="mx-auto flex max-w-5xl h-screen">
        <section className="border border-black min-w-[30%] h-5/6 text-center">
          <span>채팅방 목록</span>
          <ul>
            <li>dummy</li>
            <li>dummy</li>
            <li>dummy</li>
            <li>dummy</li>
          </ul>
        </section>
        <section className="relative flex-1 ml-4 border border-black h-5/6">
          채팅
          <div className="flex m-2.5 absolute bottom-0 left-0 right-0">
            <input
              type="text"
              className="relative border border-black flex-1"
            />
            <button
              type="button"
              className="rounded-md bg-indigo-600 p-2 ml-2 font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 w-20 text-sm sm:w-24 sm:text-base"
            >
              전송
            </button>
          </div>
        </section>
      </div>
    </Layout>
  );
}
