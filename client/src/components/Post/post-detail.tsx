import React from 'react';

interface IPostDetail {
  id: string | string[] | undefined;
}
export default function PostDetail({ id }: IPostDetail) {
  return (
    <article className="flex flex-col max-w-4xl m-auto bg-white border-gray-100 border-2 p-6 gap-7">
      <h1 className="text-xl font-bold mb-4">제목 {id}</h1>
      <p className="text-md text-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias saepe odit eos laborum culpa,
        animi sapiente! Voluptas est rem ipsum ex. Aspernatur ab voluptatem saepe deleniti incidunt
        pariatur, modi iusto! Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias saepe
        odit eos laborum culpa, animi sapiente! Voluptas est rem ipsum ex. Aspernatur ab voluptatem
        saepe deleniti incidunt pariatur, modi iusto! Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Alias saepe odit eos laborum culpa, animi sapiente! Voluptas est rem ipsum
        ex. Aspernatur ab voluptatem saepe deleniti incidunt pariatur, modi iusto! Lorem ipsum dolor
        sit amet consectetur adipisicing elit. Alias saepe odit eos laborum culpa, animi sapiente!
        Voluptas est rem ipsum ex. Aspernatur ab voluptatem saepe deleniti incidunt pariatur, modi
        iusto!
      </p>
      <p className="text-gray-400">2023년 4월 13일</p>
      <hr />
      <p className="text-gray-400 text-sm">좋아요 261 | 조회 7,042</p>
    </article>
  );
}