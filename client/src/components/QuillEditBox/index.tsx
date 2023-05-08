// 동적 import 사용
import dynamic from 'next/dynamic';

// 상수 호출
import { quillFormats, quillModules } from '@/constant';
import ReactQuill, { ReactQuillProps } from 'react-quill';
import { useRef } from 'react';

interface IQuillEditBox {
  content: string;
  handleContent: (content: string) => void;
}

interface ForwardedQuillComponent extends ReactQuillProps {
  forwardedRef: React.Ref<ReactQuill>;
}

const QuillNoSSRWrapper = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');

    return ({ forwardedRef, ...props }: ForwardedQuillComponent) => (
      <RQ ref={forwardedRef} {...props} />
    );
  },

  {
    ssr: false,
    loading: () => <p>Loading ...</p>,
  }
);

export default function QuillEditBox({
  content,
  handleContent,
}: IQuillEditBox) {
  const quillRef = useRef<ReactQuill>(null);

  return (
    <QuillNoSSRWrapper
      forwardedRef={quillRef}
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
