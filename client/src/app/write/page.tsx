'use client';

import { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// form
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { ModalType, errorMessage } from '@/constants/constant';

//components
import Tiptap from './components/Tiptap';

//hooks
import useModal from '@/hooks/modal/useModal';
import useWriting from './hooks/useWriting';
import useTipTap from './hooks/useTiptap';

//service
import { postManager } from '@/service/post';
import { useSelector } from 'react-redux';

// types
import { IReduxState } from '@/types/redux/IReduxState';
import WritingHeader from './components/WritingHeader';
import QnaOptions from './components/QnaOptions';
import { ArrowDownIcon } from '@/assets/Icon';

// TODO : title 없을 시 빨간 테두리
const ValidationSchema = Yup.object().shape({
  title: Yup.string().required(errorMessage.blankTitle),
});

export default function Write() {
  const router = useRouter();
  const postOriginId = useSearchParams().get('postOriginId') as string;
  const {
    initTitle,
    content,
    handleContent,
    postType,
    setPostType,
    tags,
    handleTags,
  } = useWriting(postOriginId);

  const user = useSelector((state: IReduxState) => state.auth);

  const { openModal } = useModal();

  const { editor } = useTipTap();
  const handleSubmit = useCallback(
    async (title: string, setSubmitting: (isSubmitting: boolean) => void) => {
      try {
        const nextContent = editor?.getHTML() || '';
        handleContent(nextContent);
        if (!user.userId) {
          openModal({ type: ModalType.ERROR, message: errorMessage.needLogin });
          return;
        }

        setSubmitting(true);
        let returnPostOriginId = postOriginId;

        if (returnPostOriginId) {
          await postManager.updatePost({
            title,
            postOriginId,
            content: nextContent,
          });
        } else {
          returnPostOriginId = await postManager.createPost({
            title,
            content: nextContent,
          });
        }

        setSubmitting(false);
        router.replace(`/board/${returnPostOriginId}`);
      } catch (e) {
        setSubmitting(false);
        openModal({ type: ModalType.ERROR, message: errorMessage.tryAgain });
      }
    },
    [editor, openModal, postOriginId, router, user.userId, handleContent]
  );
  return (
    <div className="flex flex-col w-full h-full pb-[60px]">
      {
        <Formik
          enableReinitialize={true}
          initialValues={{ title: initTitle, postType: postType }}
          validationSchema={ValidationSchema}
          onSubmit={(props, { setSubmitting }) => {
            console.log(props);
            // handleSubmit(props.title, setSubmitting);
          }}
        >
          {({ errors, isSubmitting }) => (
            <Form className="flex flex-col h-full">
              <WritingHeader
                isSubmitting={isSubmitting}
                errors={errors}
                postOriginId={postOriginId}
                postType={postType}
                setPostType={setPostType}
              />

              <div className="flex flex-col flex-1 gap-10">
                <Field
                  name="title"
                  type="text"
                  placeholder="제목을 입력하세요"
                  className="w-full h-[72px] placeholder:text-gray-scale-600 text-headline3 font-medium mt-10 py-2 px-4 border border-blue-gray-scale-50"
                />
                <Tiptap content={content} editor={editor} />

                {postType === 'qna' && (
                  <QnaOptions tags={tags} handleTags={handleTags} />
                )}
              </div>
            </Form>
          )}
        </Formik>
      }
    </div>
  );
}
