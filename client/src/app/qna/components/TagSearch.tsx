import { Dispatch, SetStateAction, useState } from 'react';

interface TagSearchProps {
  setTags: Dispatch<SetStateAction<string[]>>;
}
export default function TagSearch({ setTags }: TagSearchProps) {
  const [value, setValue] = useState('');
  return (
    <input
      className="w-[210px] h-[32px] rounded-[2px] border-gray-scale-600 bg-gray-scale-50 border-[1px] pl-[14px] flex items-center placeholder::text-gray-scale-500 text-[12px] focus:outline-none text-black focus:bg-gray-[#F8F8F8] focus:border-blue-gray-scale-300"
      placeholder="태그를 추가해보세요"
      onChange={(e) => setValue(e.target.value)}
      value={value}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          setTags((prev: string[]) => [...prev, value]);
          setValue('');
        }
      }}
    />
  );
}
