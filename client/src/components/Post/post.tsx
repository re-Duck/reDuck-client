import Link from 'next/link';
import React from 'react';

interface IPost {
  id: string;
}
export function Post({ id }: IPost) {
  return (
    <article className="flex flex-col w-full  bg-white border-gray-100 border-2 h-50 p-6 hover:cursor-pointer">
      <Link href={`/board/${id}`}>
        <h1 className="text-xl font-bold mb-4">제목</h1>
        <p className="text-md text-gray-500 line-clamp-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias saepe odit eos laborum
          culpa, animi sapiente! Voluptas est rem ipsum ex. Aspernatur ab voluptatem saepe deleniti
          incidunt pariatur, modi iusto! Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Alias saepe odit eos laborum culpa, animi sapiente! Voluptas est rem ipsum ex. Aspernatur
          ab voluptatem saepe deleniti incidunt pariatur, modi iusto!
        </p>
      </Link>
    </article>
  );
}

export default React.memo(Post);
