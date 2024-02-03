import Tag from './Tag';
import TagSearch from './TagSearch';

export default function TagNavigation() {
  return (
    <div className="w-[210px] flex flex-col gap-[40px]">
      <h1 className="font-black text-[24px] text-black">Q&A</h1>
      <div className="flex flex-col gap-4">
        <h3 className="font-medium"># 태그</h3>
        <div className="gap-2">
          <TagSearch />
          <div className="py-[12px] px-[8px] bg-[#F8F8F8] min-h-[48px] mt-2">
            <span className="text-gray-scale-500 text-[12px] flex gap-1 items-center">
              예시 <Tag name="python" type="example" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
