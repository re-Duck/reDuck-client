import React from 'react';

import Skeleton from '@/components/common/Skeleton';

export default function SideSkeleton() {
  return (
    <>
      <Skeleton.Circle width="w-48" height="h-48" />
      <div className="mt-4 flex flex-col gap-1 items-center">
        <Skeleton.Box width="w-28" height="h-6" />
        <Skeleton.Box width="w-28" height="h-6" />
        <Skeleton.Box width="w-28" height="h-6" />
      </div>
    </>
  );
}
