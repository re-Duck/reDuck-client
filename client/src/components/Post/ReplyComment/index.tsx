import { Button } from '@/components';

interface IProps {
  onClose: () => void;
}

export default function ReplyComment({ onClose }: IProps) {
  return (
    <div className="pt-3 mt-5 border-t border-blue-gray-scale-50">
      <div className="p-3 mb-2 border border-gray-scale-500 h-[60px]">
        <input
          className="w-full text-sm focus:outline-none"
          placeholder="답글을 작성해 주세요 (@를 입력하여 다른 사람을 태그할 수 있습니다)"
        />
      </div>
      <div className="justify-end flex gap-[20px] items-center">
        <span className="hover:cursor-pointer" onClick={onClose}>
          취소
        </span>
        <Button color="blue_gray">답글 작성</Button>
      </div>
    </div>
  );
}
