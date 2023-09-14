import React from 'react';

function Loading() {
  return (
    <article className="flex flex-col max-w-4xl m-auto bg-white border-gray-100 border-2 px-4 py-6 sm:p-12 gap-4">
      <h1 className="animate-pulse h-10 w-full bg-gray-100"></h1>
      <div className="w-full h-5 animate-pulse bg-gray-100"></div>
      <div className="w-full h-72 animate-pulse bg-gray-100"></div>
      <p className="text-gray-400 text-sm">좋아요 0 | 조회 0</p>
    </article>
  );
}

export default Loading;
