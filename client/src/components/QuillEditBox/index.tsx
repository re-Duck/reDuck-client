// 동적 import 사용
import dynamic from 'next/dynamic';

import React, { useCallback, useMemo, useRef } from 'react';

// 상수 호출
import { quillFormats } from '@/constant';
import ReactQuill, { ReactQuillProps } from 'react-quill';
import { uploadImagePost } from '@/service/upload-image-post';
import { BASE_URL } from '@/service/base/api';
import { useSession } from 'next-auth/react';

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
    const component = ({ forwardedRef, ...props }: ForwardedQuillComponent) => (
      <RQ ref={forwardedRef} {...props} />
    );
    return component;
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
  const { data } = useSession();
  const accessToken = data?.user.token;

  const imageHandler = useCallback(() => {
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
        const imgHash = await uploadImagePost(formData, accessToken);

        const IMG_URL = `${BASE_URL}${imgHash}`;

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
      style={{ height: '70vh' }}
      placeholder={'내용을 입력해주세요.'}
      value={content}
      onChange={handleContent}
    />
  );
}
