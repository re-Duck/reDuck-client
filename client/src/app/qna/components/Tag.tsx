import { Close } from '@/assets/Icon';
import { Dispatch, SetStateAction } from 'react';

interface TagProps {
  name: string;
  type: 'example' | 'selected' | 'popular';
  setTags: Dispatch<SetStateAction<string[]>>;
}

export default function Tag({ name, type, setTags }: TagProps) {
  const style = {
    example: 'border-gray-scale-400 text-gray-scale-500',
    selected: 'border-gray-scale-500 text-gray-scale-700',
    popular: 'border-yello-scale-500 text-gray-scale-700 ',
  };
  return (
    <span
      className={`px-2 py-1 flex gap-0.5 h-6 ${style[type]} flex items-center border-[1px] rounded-sm text-[12px]`}
    >
      {`#${name}`}
      {type === 'selected' && (
        <Close
          width={16}
          height={16}
          stroke={'#646464'}
          className="cursor-pointer"
          onClick={() => setTags((prev) => prev.filter((tag) => tag !== name))}
        />
      )}
    </span>
  );
}
