import { Layout } from '@/components';
import React, { useState } from 'react';

export default function Gpt() {
  const [isAnswerOpen, setIsAnswerOpen] = useState(false);
  return (
    <>
      <Layout>
        <div className="flex flex-col max-w-2xl gap-6 pt-8 mx-auto">
          <div className="flex justify-center">
            <h1 className="text-4xl font-bold">GPT</h1>
          </div>

          <div className="flex flex-col gap-2 ">
            <h2 className="ml-2 text-xl font-bold">Code</h2>
            <textarea className="w-full p-4 bg-white border-[0.5px] rounded-lg resize-none border-gray-300 h-72 outline-0"></textarea>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">Question</h2>
            <div className="flex justify-center gap-4">
              <input className="w-4/5 h-10 px-4 bg-white border-[0.5px] rounded-lg border-gray-300 outline-0" />
              <button
                className="px-2 bg-white border-[0.5px] rounded-lg font-semibold"
                onClick={() => setIsAnswerOpen((prev) => !prev)}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </Layout>

      {isAnswerOpen && (
        <div className="py-10 bg-slate-200">
          <div className="flex flex-col max-w-2xl gap-8 mx-auto">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold">Answer</h2>
              <textarea className="w-full bg-white border-gray-300   border-[0.5px] rounded-md resize-none h-72 outline-0"></textarea>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
