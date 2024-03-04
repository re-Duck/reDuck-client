'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

// hooks
import useModal from '@/hooks/modal/useModal';

// components
import { Icon } from '@iconify/react';

// constant
import {
  ModalType,
  errorMessage,
  successMessage,
  warningMessage,
} from '@/constants/constant';

// services
import { postManager } from '@/service/post';
import { useMutation } from '@tanstack/react-query';

interface IProps {
  IS_AUTHOR: boolean;
  postOriginId: string;
}

export default function MoreButton({ IS_AUTHOR, postOriginId }: IProps) {
  const router = useRouter();
  const { openModal } = useModal();

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const postMutation = useMutation({
    mutationFn: (id: string) => postManager.deletePost({ postOriginId: id }),
    onSuccess: () => {
      router.push('/');
      openModal({
        type: ModalType.SUCCESS,
        message: successMessage.postDeleteSuccess,
      });
    },
    onError: () =>
      openModal({
        type: ModalType.ERROR,
        message: errorMessage.tryAgain,
      }),
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative ml-auto" ref={dropdownRef}>
      <Icon
        icon="mingcute:more-2-fill"
        fontSize={24}
        className="text-gray-scale-600 hover:cursor-pointer"
        onClick={() => setOpen(true)}
      />
      {open && (
        <div className="absolute right-0 z-20 flex flex-col w-32 gap-1 px-4 py-1 border shadow-lg min-w-max bg-gray-scale-50 border-gray-scale-400">
          {IS_AUTHOR && (
            <>
              <div
                className="py-2 hover:cursor-pointer"
                onClick={() => router.push(`/write/${postOriginId}`)}
              >
                수정하기
              </div>
              <div
                className="py-2 hover:cursor-pointer"
                onClick={() =>
                  openModal({
                    type: ModalType.WARNING,
                    message: warningMessage.confirmDeletePost,
                    callback: () => postMutation.mutate(postOriginId),
                  })
                }
              >
                삭제하기
              </div>
            </>
          )}
          <div
            className="py-2 hover:cursor-pointer"
            onClick={() => {
              openModal({
                type: ModalType.ERROR,
                message: errorMessage.notComplete,
              });
            }}
          >
            신고하기
          </div>
        </div>
      )}
    </div>
  );
}
