import { BASE_URL } from '@/service/base/api';
import { uploadImagePost } from '@/service/upload-image-post';
import { Editor } from '@tiptap/react';
import { useSession } from 'next-auth/react';
import React from 'react';

function AddPhoto({ editor }: { editor: Editor }) {
  const { data } = useSession();
  const accessToken = data?.user.token;

  const handleUploadPhoto = async (files: FileList | null) => {
    if (files === null || !editor) return;

    const file = files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const imgHash = await uploadImagePost(formData, accessToken);
      const IMG_URL = `${BASE_URL}${imgHash}`;

      editor.commands.setImage({ src: IMG_URL });
    } catch (error) {
      console.error('실패');
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 -960 960 960"
      >
        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h360v80H200v560h560v-360h80v360q0 33-23.5 56.5T760-120H200Zm480-480v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80ZM240-280h480L570-480 450-320l-90-120-120 160Zm-40-480v560-560Z" />
      </svg>
    </button>
  );
}

export default AddPhoto;
