import { PostViewType } from '@/types';
import Link from 'next/link';

interface NavitatorProps {
  viewMode?: PostViewType;
}

export default function PostModeNavigation({ viewMode }: NavitatorProps) {
  return (
    <ul className="flex pt-[9px] text-[14px] text-gray-scale-500 font-bold leading-[17.92px] tracking-[-0.28px] gap-[18px]">
      <li className={viewMode === 'community' ? 'text-black' : ''}>
        <Link href="/">커뮤니티</Link>
      </li>
      <li className={viewMode === 'qna' ? 'text-black' : ''}>
        <Link href="/qna">QnA</Link>
      </li>
      <div className="w-[1px] h-[12px] bg-gray-scale-600 mt-[3px]"></div>
      <li className={viewMode === 'gpt' ? 'text-black' : ''}>
        <Link href="/gpt">Chat GPT</Link>
      </li>
    </ul>
  );
}
