'use client';
//core
import React, { useState } from 'react';
import { IPostInformation } from '@/types';

//hooks
import useScroll from '../../hooks/useScroll';

//components
import Button from '@/components/Button';
import Post from '../Post';

interface PostSectionProps {
  initialData?: { data: IPostInformation[]; nextPageParms?: string };
}

export default function PostsSection({ initialData }: PostSectionProps) {
  const [postViewType, setPostViewType] = useState<'latest' | 'popular'>(
    'latest'
  );
  const { datas } = useScroll({ initialData, type: 'qna' });
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between mb-8">
        <h1 className="text-[24px] font-black">커뮤니티</h1>

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
      </div>

      <section>
        {datas?.map((group, index) => (
          <React.Fragment key={index}>
            {group?.data.map((props: IPostInformation) => (
              <Post key={props.postOriginId} post={props} />
            ))}
          </React.Fragment>
        ))}
      </section>
    </div>
  );
}
