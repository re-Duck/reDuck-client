import React from 'react';

import { Icon } from '..';

interface IModalProp {
  type: 'success' | 'warning' | 'error';
  title: string;
  content: string;
  buttonType: 'check' | 'select';
  handleModalButton: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Modal({
  type,
  title,
  content,
  buttonType,
  handleModalButton,
}: IModalProp) {
  // 아이콘 타입
  const IconType = {
    success: (
      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
        <Icon name="check-circle" strokeWidth={2} size={24} color="green" />
      </div>
    ),
    warning: (
      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
        <Icon name="alert-triangle" strokeWidth={2} size={24} color="orange" />
      </div>
    ),
    error: (
      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
        <Icon name="alert-octagon" strokeWidth={2} size={24} color="red" />
      </div>
    ),
  };
  // 버튼 타입
  const modalButton =
    buttonType === 'check' ? (
      <button
        type="button"
        className="inline-flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
        value="check"
        onClick={handleModalButton}
      >
        확인
      </button>
    ) : (
      <>
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          value="yes"
          onClick={handleModalButton}
        >
          예
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          value="cancle"
          onClick={handleModalButton}
        >
          취소
        </button>
      </>
    );
  return (
    <div className="relative z-20">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
      <div className="fixed inset-0 z-20 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform w-full overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:max-w-lg delay-1000">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                {IconType[type]}
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    {title}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{content}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              {modalButton}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
