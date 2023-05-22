import Image, { StaticImageData } from 'next/image';
import React from 'react';

export default function CommentUpload({
  comentImgSrc,
}: {
  comentImgSrc: string | StaticImageData;
}) {
  return (
    <div className="flex justify-between items-center gap-1 h-16 bg-white border-gray-100 border-[1px] px-10">
      <Image
        src={comentImgSrc}
        alt="img"
        width={20}
        height={20}
        className="rounded-full w-10 h-10"
      />

      <input
        className=" border-b-gray-200 border-b-[1px] p-2 pl-3 w-9/12"
        placeholder="댓글을 입력해 보세요."
      />
      <button className=" bg-red-400 rounded-lg px-3 py-2 text-white text-xs">
        등록
      </button>
    </div>
  );
}
