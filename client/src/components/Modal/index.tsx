import React from 'react';

import { useSelector } from 'react-redux';
import { modalSelector } from '@/lib/redux/slices/modalSlice';
import { useModal } from '@/hooks';
import ModalIcon from './modal-icon';
import ModalButton from './modal-button';
import { MODAL_TITLE, ModalType } from '@/constant';

interface IModal {
  type:
    | ModalType.SUCCESS
    | ModalType.WARNING
    | ModalType.ERROR
    | ModalType.CLOSE;
  message: string;
}

export default function Modal() {
  const { type, message }: IModal = useSelector(modalSelector);
  const { closeModal } = useModal();

  return (
    <>
      {type !== ModalType.CLOSE && (
        <div className="relative z-20">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
          <div className="fixed inset-0 z-20 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform w-full overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:max-w-lg delay-1000">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <ModalIcon type={type} />
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h3
                        className="text-base font-semibold leading-6 text-gray-900"
                        id="modal-title"
                      >
                        {MODAL_TITLE[type]}
                      </h3>

                      <div className="mt-2">
                        <p className="text-sm text-gray-500">{message}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <ModalButton type="check" onClick={closeModal} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
