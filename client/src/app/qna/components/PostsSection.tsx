'use client';

import { useState } from 'react';
import Button from '@/components/Button';
import Post from './Post';

export default function PostSection() {
  const [postViewType, setPostViewType] = useState<
    'latest' | 'popular' | 'notAnswer'
  >('latest');
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex items-center justify-between">
        <span className="text-[20px]">112,112 질문</span>
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
          <Button
            color={
              postViewType === 'notAnswer'
                ? 'blue_gray_line'
                : 'blue_gray_line_disabled'
            }
            onClick={() => setPostViewType('notAnswer')}
          >
            답변 없는 질문
          </Button>
        </div>
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
