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
    loading: () => <p>Loading ...</p>,
  }
);

export default function QuillEditBox({
  content,
  handleContent,
}: IQuillEditBox) {
  const quillRef = useRef<ReactQuill>(null);

  const imageHandler = useCallback((props: any) => {
    console.log('에디터에서 이미지 버튼을 클릭하면 이 핸들러가 시작됩니다!');

    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.addEventListener('change', async () => {
      console.log('온체인지');
      if (input.files === null) return;

      const file = input.files[0];
      const formData = new FormData();
      formData.append('img', file);

      try {
        const dataObject = {
          suburl: '/post/image',
          data: formData,
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyZWR1Y2siLCJyb2xlcyI6W3sibmFtZSI6IlJPTEVfVVNFUiJ9XSwiaWF0IjoxNjgzMjYzMDY0LCJleHAiOjE2ODMzNDk0NjR9.PNBxX2zkDeI4npCD0NrCghs2xaGjARowlVvKv1u-7UQ',
          },
        };
        // const result = await axios_post(dataObject);
        // console.log(result);
        // console.log('성공 시, 백엔드가 보내주는 데이터', result.data.url);
        // const IMG_URL = result.data.url;
        const editor = quillRef?.current?.getEditor(); // 에디터 객체 가져오기
        console.log(editor?.root.innerHTML);
        // editor.root.innerHTML =
        //   editor.root.innerHTML + `<img src=${IMG_URL} /><br/>`; // 현재 있는 내용들 뒤에 써줘야한다.
        // const range = editor.getSelection();

        // editor.insertEmbed(range.index, 'image', IMG_URL);
      } catch (error) {
        console.log('실패했어요ㅠ');
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
