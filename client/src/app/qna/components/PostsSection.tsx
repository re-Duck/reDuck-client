'use client';

import { useState } from 'react';
import Button from '@/components/Button';
import Post from './Post';

export default function PostSection() {
  const [postViewType, setPostViewType] = useState<'latest' | 'popular'>(
    'latest'
  );
  return (
    <div className="w-[763px] flex flex-col gap-4">
      <div className="flex gap-2">
        <Button
          color={
            postViewType === 'latest'
              ? 'blue_gray_line'
              : 'blue_gray_line_disabled'
          }
          onClick={() => setPostViewType('latest')}
        >
          최신순
        </Button>

        <Button
          color={
            postViewType === 'popular'
              ? 'blue_gray_line'
              : 'blue_gray_line_disabled'
          }
          onClick={() => setPostViewType('popular')}
        >
          인기순
        </Button>
      </div>
      <section>
        <Post />
        <Post />
        <Post />
        <Post />
      </section>
    </div>
  );
}
