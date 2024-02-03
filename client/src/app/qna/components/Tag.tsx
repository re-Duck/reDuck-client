import { Close } from '@/assets/Icon';

interface TagProps {
  name: string;
  type: 'example' | 'selected';
}

export default function Tag({ name, type }: TagProps) {
  const style = {
    example: 'border-gray-scale-400 text-gray-scale-500',
    selected: 'border-gray-scale-500 text-gray-scale-700',
  };
  return (
    <span
      className={`px-2 py-1 flex gap-0.5 h-6 ${style[type]} flex items-center border-[1px] rounded-sm`}
    >
      {`#${name}`}
      {type === 'selected' && <Close />}
    </span>
  );
}
