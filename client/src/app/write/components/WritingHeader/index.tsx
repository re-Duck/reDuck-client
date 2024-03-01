'use client';

import { ArrowDownIcon } from '@/assets/Icon';
import Button from '@/components/Button';
import { ModalType, warningMessage } from '@/constants/constant';
import useModal from '@/hooks/modal/useModal';
import { PostType } from '@/types';
import { Field } from 'formik';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useState } from 'react';

interface WritingHeaderProps {
  isSubmitting: boolean;
  errors: {
    title?: string;
  };
  postOriginId?: string;
  postType: PostType;
  setPostType: Dispatch<SetStateAction<PostType>>;
}

type PostTypeNameKey = keyof typeof postTypeName;

const postTypeName = {
  qna: 'QnA 작성하기',
  stack: '게시글 작성하기',
} as const;

export default function WritingHeader({
  isSubmitting,
  errors,
  postOriginId,
  postType,
  setPostType,
}: WritingHeaderProps) {
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const [isClickedType, setIsClickedType] = useState(false);

  return (
    <header className="w-full h-[64px] border-b border-gray-scale-400 px-4 flex justify-between items-center">
      <button
        className="flex items-center gap-1 text-body2"
        onClick={() =>
          openModal({
            type: ModalType.WARNING,
            message: warningMessage.confirmGoOut,
            callback: () => {
              closeModal();
              router.push(postOriginId ? `board/${postOriginId}` : '/');
            },
          })
        }
      >
        <ArrowDownIcon className="rotate-90" />
        나가기
      </button>
      <div className="relative flex flex-col items-center justify-center gap-1 cursor-pointer">
        <Field
          className="flex items-center gap-1 font-bold bg-white text-body2"
          as="div"
          name="postType"
          onChange={setPostType}
          onClick={() => setIsClickedType((prev) => !prev)}
        >
          {postTypeName[postType]}
          <ArrowDownIcon />
        </Field>
        {isClickedType && (
          <ul className="w-[200px] h-[90px] absolute bg-gray-scale-50 z-10 top-8 flex flex-col justify-center border border-gray-scale-400 rounded-sm cursor-pointer">
            {Object.keys(postTypeName).map((type) => (
              <li
                key={type}
                value={type}
                className={`flex justify-center w-full px-4 py-2 text-body3 h-9 items-center ${
                  postType === type && 'bg-gray-scale-300'
                }`}
                onClick={() => {
                  setPostType(type as PostTypeNameKey);
                  setIsClickedType(false);
                }}
              >
                {postTypeName[type as PostTypeNameKey]}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex items-center gap-3">
        <Button color="blue_gray_line">임시저장</Button>
        <Button
          color="yellow"
          type="submit"
          disabled={isSubmitting}
          onClick={() => {
            errors.title &&
              openModal({
                type: ModalType.ERROR,
                message: errors.title,
              });
          }}
        >
          완료
        </Button>
      </div>
    </header>
  );
}
