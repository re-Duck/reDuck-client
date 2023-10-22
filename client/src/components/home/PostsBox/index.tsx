import React from 'react';
import { IPostInformation } from '@/types';
import useScroll from '@/hooks/Main/useScroll';

import { PostSummary } from '../../common/Post';
import LoadingIcon from '../../common/LoadingIcon';

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
