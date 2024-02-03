'use client';

import { useState } from 'react';
import Tag from './Tag';
import TagSearch from './TagSearch';

export default function TagNavigation() {
  const [tags, setTags] = useState<string[]>([]);
  const hasNoTags = tags.length === 0;

  return (
    <div className="w-[210px] flex flex-col gap-[40px]">
      <h1 className="font-black text-[24px] text-black">Q&A</h1>
      <div className="flex flex-col gap-4">
        <h3 className="font-medium"># 태그</h3>
        <div className="gap-2">
          <TagSearch setTags={setTags} />
          <div className="py-[12px] px-[8px] bg-[#F8F8F8] min-h-[48px] mt-2 text-gray-scale-500 text-[12px] flex items-center gap-1 flex-wrap">
            {hasNoTags ? (
              <>
                <span>예시</span>
                <Tag name="python" type="example" setTags={setTags} />
              </>
            ) : (
              tags.map((tag) => (
                <Tag key={tag} name={tag} type="selected" setTags={setTags} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
