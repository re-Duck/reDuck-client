/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/display-name */
// 동적 import 사용
import dynamic from 'next/dynamic';

import { useCallback, useMemo, useRef } from 'react';

// 상수 호출
import { quillFormats } from '@/constant';
import ReactQuill, { ReactQuillProps } from 'react-quill';
import { axios_post } from '@/service/base/api';

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
  }
);

export default function QuillEditBox({
  content,
  handleContent,
}: IQuillEditBox) {
  const quillRef = useRef<ReactQuill>(null);

  const imageHandler = useCallback((props: any) => {
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.addEventListener('change', async () => {
      if (input.files === null) return;

      const file = input.files[0];
      const formData = new FormData();
      formData.append('file', file);

      try {
        const dataObject = {
          suburl: '/post/image',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
          },
        };
        const result = await axios_post(dataObject);

        const IMG_URL = `http://168.188.123.234:8080${result.data}`;

        const editor = quillRef?.current?.getEditor();
        const IS_EDITOR_NULL = editor === undefined || editor === null;

        if (IS_EDITOR_NULL) return;

        const range = editor.getSelection();
        const IS_RANGE_NULL = range === null;

        if (IS_RANGE_NULL) return;

        editor.insertEmbed(range.index, 'image', IMG_URL);
      } catch (error) {
        console.log('실패');
      }
    });
  }, []);

  const quillModules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: '1' }, { header: '2' }, { font: [] }],
          [{ size: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link', 'image'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );
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
