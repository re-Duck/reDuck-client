import Link from 'next/link';
import React from 'react';

interface IPost {
  comments: string | null;
  postAuthorDevelopAnnual: string;
  postAuthorId: string;
  postAuthorName: string;
  postAuthorProfileImg: {
    uploadedFileName: string;
    storagedFileName: string;
    extension: string;
    size: number;
    path: string;
  };
  postContentPath: string;
  postCreatedAt: string;
  postOriginId: string;
  postTitle: string;
  postType: string;
  postUpdatedAt: string;
}

export function Post(props: IPost) {
  return (
    <article className="flex flex-col w-full  bg-white border-gray-100 border-2 h-50 p-6 hover:cursor-pointer rounded-lg">
      <Link href={`/board/${props.postOriginId}`}>
        <h1 className="text-xl font-bold mb-4">{props.postTitle}</h1>
        <p className="text-md text-gray-500 line-clamp-3">{props.comments}</p>
      </Link>
    </article>
  );
}

export default React.memo(Post);
