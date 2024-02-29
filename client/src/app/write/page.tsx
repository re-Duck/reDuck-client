'use client';

import { ArrowDownIcon } from '@/assets/Icon';
import Button from '@/components/Button';
import Tiptap from './components/Tiptap';
import useTipTap from './hooks/useTiptap';

export default function Write() {
  const { editor } = useTipTap();
  return (
    <div className="flex flex-col w-full h-full pb-[60px]">
      <header className="w-full h-[64px] border-b border-gray-scale-400 px-4 flex justify-between items-center">
        <button className="flex items-center gap-1 text-body2">
          <ArrowDownIcon className="rotate-90" />
          나가기
        </button>
        <button className="flex items-center gap-1 font-bold text-body2">
          QnA 작성하기
          <ArrowDownIcon className="w-[20px] h-[20px]" />
        </button>
        <div className="flex items-center gap-3">
          <Button color="blue_gray_line">임시저장</Button>
          <Button color="yellow">완료</Button>
        </div>
      </header>
      <div className="flex flex-col flex-1 gap-10">
        <input
          name="title"
          type="text"
          placeholder="제목을 입력하세요"
          className="w-full h-[72px] placeholder:text-gray-scale-600 text-headline3 font-medium mt-10 py-2 px-4 border border-blue-gray-scale-50"
        />
        <Tiptap content={''} editor={editor} />
        <div className="flex h-8 gap-3 px-3 py-2 border-b border-blue-gray-scale-50">
          <span className="text-caption1 text-gray-scale-700">
            # 태그를 입력해주세요 <strong className="font-bold">(필수)</strong>
          </span>
          <span className="text-caption1 text-gray-scale-500">
            최대 3개 (예시_# java)
          </span>
        </div>
      </div>
    </div>
  );
}
