import Layout from '@/components/Layout';
import React, { useState, useRef } from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';

import { Divider, Avatar } from '@/components';
import { imageFileMaxSize, developExperience } from '@/constant';

export default function SignUp() {
  const imgRef = useRef<HTMLInputElement>(null);
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [certificationNumber, setCertificationNumber] = useState<number | null>(
    null
  );

  const handleChooseFile = () => {
    imgRef.current!.click();
  };

  const handleImgInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length !== 0) {
      const file = e.target.files[0];
      let fileSize = file.size;
      if (fileSize > imageFileMaxSize) {
        // TODO: 모달창로 바꾸기
        alert('이미지 파일 최대 용량을 넘었습니다.');
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        // null 방지
        if (reader.result) {
          if (typeof reader.result === 'string') {
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

  const handleRequestEmail = () => {
    // TODO: API 연동
    setCertificationNumber(9999);
  };
  return (
    <Layout>
      <div className="max-w-xl m-auto">
        <div>
          <h2 className="text-2xl font-bold text-center">회원가입</h2>
          <p className="text-xs text-right pt-1">
            <span className="text-red-500">*</span> 필수입력사항
          </p>
        </div>
        <Divider type="horizental" thin={2} margin={4} />
        <div className="flex flex-col gap-y-10">
          <div className="inline-flex w-full h-[38px] items-center">
            <label className="text-xs w-20 sm:text-base sm:w-28">
              아이디 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="grow h-full p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
              placeholder="아이디를 입력해주세요"
            />
            <button
              type="button"
              className="rounded-md bg-indigo-600 p-2 ml-2 font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 w-20 text-sm sm:w-24 sm:text-base"
            >
              중복확인
            </button>
          </div>
          <div className="inline-flex w-full h-[38px] items-center">
            <label className="text-xs w-20 sm:text-base sm:w-28">
              비밀번호 <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              className="grow h-full p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
              placeholder="비밀번호를 입력해주세요 "
            />
          </div>
          <div className="inline-flex w-full h-[38px] items-center">
            <label className="text-xs w-20 sm:text-base sm:w-28">
              비밀번호 확인 <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              className="grow h-full p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
              placeholder="비밀번호를 한번 더 입력해주세요 "
            />
          </div>
          <div className="inline-flex w-full h-[38px] items-center">
            <label className="text-xs w-20 sm:text-base sm:w-28">
              이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="grow h-full p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
              placeholder="이름을 입력해주세요."
            />
          </div>
          <div className="inline-flex w-full items-center">
            <label className="text-xs w-28 sm:text-base sm:w-28">
              프로필 이미지
            </label>
            <div className="flex gap-x-4 items-baseline flex-wrap">
              <Avatar src={profileImg} alt="profileImg" hasDot={false} />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={imgRef}
                onChange={handleImgInput}
              />
              <button
                onClick={handleChooseFile}
                className="rounded-md bg-indigo-600 p-1 font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 w-20 text-sm sm:w-24 sm:text-base"
              >
                파일 업로드
              </button>
              <span className="text-xs text-zinc-500">
                이미지 크기의 최대용량은 10MB 입니다.
              </span>
            </div>
          </div>
          <div className="inline-flex w-full h-[38px] items-center">
            <label className="text-xs w-20 sm:text-base sm:w-28">
              이메일 <span className="text-red-500">*</span>
            </label>
            <div className="flex grow flex-col gap-y-1">
              <div className="flex grow">
                <input
                  type="text"
                  className="flex-1 p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                  placeholder="예 : reduck12@duckoo.com "
                />
                <button
                  type="button"
                  className="rounded-md bg-indigo-600 p-2 ml-2 font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 w-20 text-xs sm:w-24 sm:text-sm"
                  onClick={handleRequestEmail}
                >
                  인증번호발송
                </button>
              </div>
              {certificationNumber && (
                <div className="flex flex-none">
                  <input
                    type="text"
                    className="flex-0 p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                  />
                  <button
                    type="button"
                    className="rounded-md bg-indigo-600 p-2 ml-2 font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 w-20 text-xs sm:w-24 sm:text-sm"
                  >
                    인증번호확인
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="inline-flex w-full items-center">
            <label className="text-xs w-20 sm:text-base sm:w-28">
              직장/학교
            </label>
            <div className="grow">
              <div className="flex gap-x-8 mb-2 items-center">
                <label className="text-xs sm:text-base sm:w-28">
                  <input type="radio" name="job" value="developer" />
                  현직 개발자
                </label>
                <label className="text-xs sm:text-base sm:w-28">
                  <input type="radio" name="job" value="student" />
                  대학생
                </label>
                <label className="text-xs sm:text-base sm:w-28">
                  <input type="radio" name="job" value="etc" />
                  기타
                </label>
              </div>
              <input
                type="text"
                className="w-full h-full p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
              />
            </div>
          </div>
          <div className="inline-flex w-full h-[38px] items-center">
            <label className="text-xs w-20 sm:text-base sm:w-28">
              개발시작연도
            </label>
            <select className="grow h-full p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
              {developExperience.map((val) => (
                <option value={val} key={val}>
                  {val}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Divider type="horizental" thin={2} margin={8} />
        <div className="text-center">
          <button className="rounded-md bg-indigo-600 p-2 ml-2 font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 w-20 text-sm">
            회원가입
          </button>
        </div>
      </div>
    </Layout>
  );
}
