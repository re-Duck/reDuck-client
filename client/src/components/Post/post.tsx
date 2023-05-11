import Link from 'next/link';
import React from 'react';

//Interface
import { IPostInformation } from '@/types';

export function Post(props: IPostInformation) {
  return (
    <article className="flex flex-col w-full  bg-white border-gray-100 border-2 h-50 p-6 hover:cursor-pointer rounded-lg">
      <Link href={`/board/${props.postOriginId}`}>
        <h1 className="text-xl font-bold mb-4">{props.postTitle}</h1>
        <p className="text-md text-gray-500 line-clamp-3">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia nam rem
          perferendis quisquam nulla itaque atque tempora esse praesentium ipsam
          eaque provident nemo accusantium, deleniti minus? Mollitia facere
          laudantium voluptatum?
        </p>
      </Link>
    </article>
  );
}

export default React.memo(Post);
