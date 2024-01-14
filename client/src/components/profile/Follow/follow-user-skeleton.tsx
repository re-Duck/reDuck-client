import React from 'react';

// components
import { Skeleton } from '@/components';

export default function FollowUserSkeleton() {
  const dummyArray = Array.from({ length: 5 }, (v, k) => k);

  return (
    <>
      {dummyArray.map((_, index) => (
        <div key={index} className="relative flex items-center">
          <div className="flex items-center gap-3">
            <Skeleton.Circle width="w-20" height="h-20" />
            <div className="flex flex-col gap-2">
              <Skeleton.Box width="w-24" height="h-8" />
              <Skeleton.Box width="w-14" height="h-6" />
            </div>
          </div>
          <div className="absolute right-0">
            <Skeleton.Box width="w-24" height="h-10" />
          </div>
        </div>
      ))}
    </>
  );
}
