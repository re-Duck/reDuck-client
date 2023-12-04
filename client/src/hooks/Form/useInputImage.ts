// react, next
import React, { useState, useRef } from 'react';

// constant
import { IMAGE_FILE_MAX_SIZE } from '@/constants/constant';

// services
import { BASE_URL } from '@/service/base/api';

function useInputImage(initialProfileImg?: string) {
  const imgRef = useRef<HTMLInputElement>(null);

  const [profileImg, setProfileImg] = useState<string>(
    `${BASE_URL}${initialProfileImg || ''}`
  );
  const [imgFile, setImgFile] = useState<Blob | null>(null);

  const handleChooseFile = () => {
    imgRef.current?.click();
  };

  const handleImgInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length !== 0) {
      const file = e.target.files[0];
      const fileSize = file.size;
      if (fileSize > IMAGE_FILE_MAX_SIZE) {
        alert('이미지 파일 용량 초과');
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        // null 방지
        if (reader.result) {
          if (typeof reader.result === 'string') {
            setImgFile(file);
            setProfileImg(reader.result);
          } else {
            // ArrayBuffer인 경우 string으로 변경
            setProfileImg(
              String.fromCharCode.apply(
                null,
                Array.from(new Uint16Array(reader.result))
              )
            );
          }
        }
      };
    }
  };

  return { imgRef, profileImg, imgFile, handleChooseFile, handleImgInput };
}

export default useInputImage;
