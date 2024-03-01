import { Close } from '@/assets/Icon';
import { Field } from 'formik';
import { useState } from 'react';

interface QnaOptionsProps {
  tags: string[];
  handleTags: (value: string, type: 'add' | 'remove') => void;
}
export default function QnaOptions({ tags, handleTags }: QnaOptionsProps) {
  const [tag, setTag] = useState('');
  return (
    <div className="flex justify-between h-8 px-3 py-2 border-b border-blue-gray-scale-50">
      <div className="flex gap-4">
        <div className="flex items-center gap-1">
          <span className="text-caption1 text-gray-scale-700">#</span>
          <input
            className="w-40 px-2 py-1 text-caption1 placeholder:text-gray-scale-700"
            placeholder="태그를 입력해주세요 (필수)"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleTags(tag, 'add');
                setTag('');
              }
            }}
          />
        </div>

        <div className="flex items-center gap-2 text-cation1 text-gray-scale-500">
          {tags.length === 0 && <span>최대 3개 (예시_# java)</span>}
          {tags.map((tag) => (
            <div
              key={tag}
              className="flex items-center gap-[1px] cursor-pointer"
              onClick={() => handleTags(tag, 'remove')}
            >
              <span>#{tag}</span>
              <Close
                width={16}
                height={16}
                stroke={'#646464'}
                className="cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-1">
        <div className="w-[18px] h-[18px] flex justify-center items-center">
          <Field
            name="gptAnswer"
            type="checkbox"
            className="w-[14px] h-[14px] accent-blue-gray-scale-500"
          />
        </div>

        <span className="font-bold text-center text-body3 text-blue-gray-scale-500">
          GPT 답변
        </span>
      </div>
    </div>
  );
}
