import { ProfileIcon } from '@/assets/Icon';

export default function ProfileButton() {
  return (
    <button className="relative flex items-center justify-center w-full h-full rounded-full cursor-pointer bg-gray-scale-300 border-[1px] border-gray-scale-400">
      <ProfileIcon />
    </button>
  );
}
