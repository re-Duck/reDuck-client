import React from 'react';
import TagNavigation from './components/TagNavigation';
import PostSection from './components/PostsSection';

export default function Qna() {
  return (
    <div className="flex flex-col w-full gap-[42px] max-w-[850px]">
      <TagNavigation />
      <PostSection />
    </div>
  );
}
