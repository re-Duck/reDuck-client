import React from 'react';
import { IPostInformation } from '@/types';
import useScroll from '@/hooks/Main/useScroll';

import { Post } from '../../common/Post/post';
import LoadingIcon from '../../common/LoadingIcon';

function PostsBox() {
  const { datas, hasNextPage } = useScroll();

  return (
    <>
      {datas?.map((group, index) => (
        <React.Fragment key={index}>
          {group?.data.map((props: IPostInformation) => (
            <Post key={props.postOriginId} {...props} />
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
