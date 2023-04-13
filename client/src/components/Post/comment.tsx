import React from 'react';

interface IPost {
  id: string;
}
export default function Comment({ id }: IPost) {
  return (
    <div className="flex flex-col w-full max-w-4xl m-auto bg-white border-gray-100 border-2 p-6 gap-7">
      <p className="text-md text-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias saepe odit eos laborum culpa,
        animi sapiente! Voluptas est rem ipsum ex. Aspernatur ab voluptatem saepe deleniti incidunt
        pariatur, modi iusto!
      </p>
    </div>
  );
}
