import React from 'react';
import TagNavigation from './components/TagNavigation';
import PostSection from './components/PostsSection';

export default function Qna() {
  return (
    <div className="mt-[38px] flex justify-between">
      <TagNavigation />
      <PostSection />
    </div>
  );
}
