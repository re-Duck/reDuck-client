'use client';

import { useState } from 'react';
import Tag from './Tag';
import TagSearch from './TagSearch';
import { Tag as TagIcon } from '@/assets/Icon';

export default function TagNavigation() {
  const [tags, setTags] = useState<string[]>(['text']);
  const hasNoTags = tags.length === 0;

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-black text-[24px] text-black">Q&A</h1>
      <div className="flex flex-col gap-[18px]">
        <div className="flex gap-4">
          <h3 className="font-medium">이번주 인기 태그</h3>
          <div className="flex gap-1">
            <Tag name="python" type="popular" setTags={setTags} />
            <Tag name="python" type="popular" setTags={setTags} />
            <Tag name="python" type="popular" setTags={setTags} />
            <Tag name="python" type="popular" setTags={setTags} />
            <Tag name="python" type="popular" setTags={setTags} />
          </div>
        </div>

        <div className="w-full bg-[#FFFCE5] p-4 gap-4 flex flex-col border border-yello-scale-500 rounded-sm">
          <h3 className="flex items-center gap-1 text-blue-gray-scale-500">
            <TagIcon />
            태그
          </h3>
          <div className="flex flex-col gap-2">
            <TagSearch setTags={setTags} />
            <div className=" text-gray-scale-500 text-[12px] flex items-center gap-1 flex-wrap">
              {tags.map((tag) => (
                <Tag key={tag} name={tag} type="selected" setTags={setTags} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
