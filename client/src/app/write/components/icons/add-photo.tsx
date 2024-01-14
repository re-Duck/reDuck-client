'use client';

//core
import React from 'react';

//constants
import { ModalType, errorMessage } from '@/constants/constant';

//service
import { BASE_URL } from '@/service/base/api';
import { postManager } from '@/service/post';

//third party
import { Editor } from '@tiptap/react';
import { useModal } from '@/hooks';
import { Icon } from '@iconify/react';

function AddPhoto({ editor }: { editor: Editor }) {
  const { openModal } = useModal();

  const handleUploadPhoto = async (files: FileList | null) => {
    if (files === null || !editor) return;

    const file = files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const imgHash = await postManager.uploadImage(formData);
      const IMG_URL = `${BASE_URL}${imgHash}`;

      editor.commands.setImage({
        src: IMG_URL,
        alt: file.name,
        title: file.name,
      });
    } catch (error) {
      openModal({
        type: ModalType.ERROR,
        message: errorMessage.failedUploadImage,
      });
    }
  };
  return (
    <button
      type="button"
      className="relative w-8 h-8 cursor-pointer opacity-70 hover:opacity-40"
    >
      <input
        type="file"
        className="absolute top-0 left-0 w-8 h-8 outline-none opacity-0 file:cursor-pointer"
        accept="image/*"
        onChange={(e) => {
          handleUploadPhoto(e.target.files);
          e.target.value = '';
        }}
      />
      <Icon icon="uil:image-plus" fontSize={32} color="black" />
    </button>
  );
}

export default AddPhoto;
