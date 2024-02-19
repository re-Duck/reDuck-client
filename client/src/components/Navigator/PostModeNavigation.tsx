import { PostViewType } from '@/types';
import Link from 'next/link';

interface NavitatorProps {
  viewMode?: PostViewType;
}

export default function PostModeNavigation({ viewMode }: NavitatorProps) {
  return (
    <ul className="flex pt-[9px] text-[14px] text-gray-scale-500 font-bold leading-[17.92px] tracking-[-0.28px] gap-[18px] relative">
      <li
        className={`${viewMode === 'community' ? 'text-black' : ''} relative`}
      >
        <Link href="/community">커뮤니티</Link>
        <hr
          className={`h-[2px] w-full absolute bottom-[-1px] left-0 bg-yellow-scale-400 z-10 text-yellow-scale-400 ${
            viewMode === 'community' ? 'visible' : 'invisible'
          }`}
        />
      </li>
      <li className={viewMode === 'qna' ? 'text-black relative' : ''}>
        <Link href="/qna">QnA</Link>
        <hr
          className={`h-[2px] w-full absolute bottom-[-1px] left-0 bg-yellow-scale-400 z-10 text-yellow-scale-400 ${
            viewMode === 'qna' ? 'visible' : 'invisible'
          }`}
        />
      </li>
      <div className="w-[1px] h-[12px] bg-gray-scale-600 mt-[3px]"></div>
      <li className={viewMode === 'gpt' ? 'text-black relative' : ''}>
        <Link href="/gpt">Chat GPT</Link>
        <hr
          className={`h-[2px] w-full absolute bottom-[-1px] left-0 bg-yellow-scale-400 z-10 text-yellow-scale-400 ${
            viewMode === 'gpt' ? 'visible' : 'invisible'
          }`}
        />
      </li>
    </ul>
  );
}
