import Image from 'next/image';
import Link from 'next/link';
import Button from '../Button';
import SearchButton from './SearchButton';
import ChatButton from './ChatButton';
import AlarmButton from './AlarmButton';
import ProfileButton from './ProfileButton';
import { ArrowDownIcon } from '@/assets/Icon';
import PostModeNavigation from './PostModeNavigation';
import { PostViewType } from '@/types';

interface NavitatorProps {
  viewMode?: PostViewType;
}
export default function Navigator({ viewMode }: NavitatorProps) {
  return (
    <div className="w-full z-10 h-[120px] fixed bg-white">
      <div className="px-4 sm:px-4 max-w-[1024px] w-full h-full flex flex-col gap-[14px] m-auto">
        <div className="flex items-center justify-between  w-full h-[64px]">
          <Link href="/" className="flex gap-1  h-[30px] items-center">
            <span className="text-[24px] font-pilseoung flex items-center">
              reDuck
            </span>
            <Image
              src="/images/main-duck.png"
              alt="reDuck-icon"
              width={24}
              height={24}
            />
          </Link>

          <div className="flex items-center gap-4 h-[36px]">
            <ul className="flex gap-4">
              <li className="w-6 h-6">
                <SearchButton />
              </li>
              <li className="w-6 h-6">
                <ChatButton />
              </li>
              <li className="w-6 h-6">
                <AlarmButton />
              </li>
            </ul>
            <Link
              href="/profile"
              className="flex items-center justify-center cursor-pointer w-[36px] h-[36px]"
            >
              <ProfileButton />
            </Link>
          </div>
        </div>

        <div className="w-full h-[40px]">
          <div className="border-b-[1px] border-gray-scale-400 w-full h-full flex justify-between">
            <PostModeNavigation viewMode={viewMode} />
            <Button color="yellow">
              작성하기
              <ArrowDownIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
