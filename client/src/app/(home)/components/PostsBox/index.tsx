'use client';

import React from 'react';
import useScroll from '../../hooks/useScroll';
import { IPostInformation } from '@/types';
import { PostSummary } from '@/components/Post';
import { LoadingIcon } from '@/components';

function PostsBox() {
  const { datas, hasNextPage } = useScroll();

  return (
    <>
      {datas?.map((group, index) => (
        <React.Fragment key={index}>
          {group?.data.map((props: IPostInformation) => (
            <PostSummary key={props.postOriginId} postInfoData={props} />
          ))}
        </React.Fragment>
      ))}

      <div className="flex justify-center">
        {hasNextPage && <LoadingIcon size="40px" />}
      </div>
    </>
  );
}

export default PostsBox;
