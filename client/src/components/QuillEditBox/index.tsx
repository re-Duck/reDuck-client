// 동적 import 사용
import dynamic from 'next/dynamic';

// 상수 호출
import { quillFormats, quillModules } from '@/constant';

interface IQuillEditBox {
  content: string;
  handleContent: (content: string) => void;
}

const QuillNoSSRWrapper = dynamic(
  () => import('react-quill'),

  {
    ssr: false,
    loading: () => <p>Loading ...</p>,
  }
);

export default function QuillEditBox({
  content,
  handleContent,
}: IQuillEditBox) {
  return (
    <QuillNoSSRWrapper
      modules={quillModules}
      formats={quillFormats}
      theme="snow"
      style={{ height: '500px' }}
      placeholder={'내용을 입력해주세요.'}
      value={content}
      onChange={handleContent}
    />
  );
}
