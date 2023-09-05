import React from 'react';
import { Post } from '../common/Post/post';
import { IPostInformation } from '@/types';
import LoadingIcon from '../common/LoadingIcon';

interface IPostsBox {
  datas:
    | {
        data: IPostInformation[];
      }[]
    | undefined;
  hasNextPage: boolean | undefined;
}

function PostsBox({ datas, hasNextPage }: IPostsBox) {
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
