import React, { useEffect, useState } from 'react';

//interface
import IPost from './IPost';

interface PostDetail {
  data: IPost;
}

export default function PostDetail({ data }: PostDetail) {
  return (
    <article className="flex flex-col max-w-4xl m-auto bg-white border-gray-100 border-2 p-6 gap-7">
      <h1 className="text-xl font-bold mb-4">{data.postTitle}</h1>
      <p className="text-md text-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias saepe
        odit eos laborum culpa, animi sapiente! Voluptas est rem ipsum ex.
        Aspernatur ab voluptatem saepe deleniti incidunt pariatur, modi iusto!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias saepe
        odit eos laborum culpa, animi sapiente! Voluptas est rem ipsum ex.
        Aspernatur ab voluptatem saepe deleniti incidunt pariatur, modi iusto!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias saepe
        odit eos laborum culpa, animi sapiente! Voluptas est rem ipsum ex.
        Aspernatur ab voluptatem saepe deleniti incidunt pariatur, modi iusto!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias saepe
        odit eos laborum culpa, animi sapiente! Voluptas est rem ipsum ex.
        Aspernatur ab voluptatem saepe deleniti incidunt pariatur, modi iusto!
      </p>
      <p className="text-gray-400">{data.postCreatedAt}</p>
      <hr />
      <p className="text-gray-400 text-sm">좋아요 261 | 조회 7,042</p>
    </article>
  );
}
