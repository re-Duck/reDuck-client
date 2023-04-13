import React from 'react';

interface IPost {
  id: string;
}
export default function PostDetail({ id }: IPost) {
  return (
    <article className="flex flex-col w-full  bg-white border-gray-100 border-2 h-50 p-6 hover:cursor-pointer">
      <h1 className="text-xl font-bold mb-4">제목 {id}</h1>
      <p className="text-md text-gray-500 ">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias saepe odit eos laborum culpa,
        animi sapiente! Voluptas est rem ipsum ex. Aspernatur ab voluptatem saepe deleniti incidunt
        pariatur, modi iusto! Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias saepe
        odit eos laborum culpa, animi sapiente! Voluptas est rem ipsum ex. Aspernatur ab voluptatem
        saepe deleniti incidunt pariatur, modi iusto!
      </p>
    </article>
  );
}
