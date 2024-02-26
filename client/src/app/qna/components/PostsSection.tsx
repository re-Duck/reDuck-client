'use client';

import React, { useState } from 'react';

//components
import Post from './Post';
import { LoadingIcon, Button } from '@/components';

//hooks
import useScroll from '@/hooks/scroll/useScroll';

//types
import { IPostInformation } from '@/types';

interface PostSectionProps {
  initialData?: { data: IPostInformation[]; nextPageParms?: string };
}

export default function PostSection() {
  const [postViewType, setPostViewType] = useState<
    'latest' | 'popular' | 'notAnswer'
  >('latest');
  const { datas, hasNextPage } = useScroll({
    initialData: undefined,
    type: 'qna',
  });
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
        {datas?.map((group, index) => (
          <React.Fragment key={index}>
            {group?.data.map((props: IPostInformation) => (
              <Post key={props.postOriginId} post={props} />
            ))}
          </React.Fragment>
        ))}
      </section>
      <div className="flex justify-center">
        {hasNextPage && <LoadingIcon size="40px" />}
      </div>
    </div>
  );
}
