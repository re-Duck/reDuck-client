import React from 'react';
import Skeleton from '@/components/common/Skeleton';

function Loading() {
  return (
    <article className="flex flex-col w-full gap-8 p-6 bg-white border-2 border-gray-100 rounded-l h-50">
      <div className="flex">
        <div className="flex items-center gap-2 mb-4 ">
          <Skeleton.Circle width="w-12" height="h-12" />
          <div className="flex flex-col gap-2">
            <Skeleton.Box width="w-12" height="h-3" />
            <Skeleton.Box width="w-24" height="h-3" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Skeleton.Box width="w-40" height="h-4" />
        <Skeleton.Box width="w-60" height="h-4" />
        <Skeleton.Box width="w-80" height="h-4" />
        <Skeleton.Box width="w-100" height="h-4" />
      </div>
    </article>
  );
}

export default Loading;
