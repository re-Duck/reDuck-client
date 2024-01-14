import React from 'react';
import Skeleton from '../../../../components/Skeleton';

function Loading() {
  return (
    <article className="flex flex-col max-w-4xl gap-4 px-4 py-6 m-auto bg-white border-2 border-gray-100 sm:p-12">
      <Skeleton.Box width="w-full" height="h-10" />
      <Skeleton.Box width="w-full" height="h-5" />
      <Skeleton.Box width="w-full" height="h-72" />
      <p className="text-sm text-gray-400">좋아요 0 | 조회 0</p>
    </article>
  );
}

export default Loading;
