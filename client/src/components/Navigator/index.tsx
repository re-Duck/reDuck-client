import Image from 'next/image';
import Link from 'next/link';
import Button from '../Button';
import SearchButton from './SearchButton';
import ChatButton from './ChatButton';
import AlarmButton from './AlarmButton';
import ProfileButton from './ProfileButton';

export default function Navigator() {
  return (
    <div className="w-full z-10 h-[120px] flex flex-col gap-[14px] items-center fixed bg-white">
      <div className="flex items-center justify-between max-w-[1024px] w-full h-[64px] px-4">
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

      <div className="max-w-[1024px] w-full h-[42px] px-4">
        <div className="border-b-[1px] border-gray-scale-400 w-full h-full flex justify-between">
          <ul className="flex pt-[9px] text-[14px] text-gray-scale-500 font-bold leading-[17.92px] tracking-[-0.28px]">
            <li>커뮤니티</li>
            <li>QnA</li>
            <li>
              <Link href="mygpt" />
              Chat GPT
            </li>
          </ul>
          <Button colorType="yellow">작성하기</Button>
        </div>
      </div>
    </div>
  );
}
