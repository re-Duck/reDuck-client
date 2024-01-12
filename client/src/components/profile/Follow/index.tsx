import React, { useState, Suspense } from 'react';

// components
import FollowList from './follow-list';
import FollowUserSkeleton from './follow-user-skeleton';

export default function Follow({ targetUserId }: { targetUserId: string }) {
  const [tab, setTab] = useState<'follower' | 'following'>('follower');
  return (
    <div>
      <div className="flex ">
        <div
          className={`flex-1 p-2 text-center ${
            tab === 'follower'
              ? 'shadow-[-2px_-8px_15px_-3px_rgba(0,0,0,0.1)]'
              : 'shadow-inner shadow-slate-200 bg-slate-100'
          }`}
          onClick={() => setTab('follower')}
        >
          팔로워
        </div>
        <div
          className={`flex-1 p-2 text-center ${
            tab === 'following'
              ? 'shadow-[2px_-8px_15px_-3px_rgba(0,0,0,0.1)]'
              : 'shadow-inner shadow-slate-200 bg-slate-100'
          }`}
          onClick={() => setTab('following')}
        >
          팔로잉
        </div>
      </div>
      <div className="bg-white p-5 h-[70vh] shadow-lg overflow-y-scroll flex flex-col gap-4 sm:p-10">
        <Suspense fallback={<FollowUserSkeleton />}>
          <FollowList type={tab} userId={targetUserId} />
        </Suspense>
      </div>
    </div>
  );
}
