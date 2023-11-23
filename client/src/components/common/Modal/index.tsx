import React from 'react';

import { useSelector } from 'react-redux';
import { modalSelector } from '@/lib/redux/slices/modalSlice';
import { useModal } from '@/hooks';
import ModalIcon from './modal-icon';
import ModalButton from './modal-button';
import { MODAL_TITLE, ModalType } from '@/constants/constant';

export default function Modal() {
  const { type, message, callback } = useSelector(modalSelector);
  const { closeModal } = useModal();
  const IS_CONFIRM_MODAL = type === ModalType.WARNING;
  return (
    <>
      {type !== ModalType.CLOSE && (
        <div className="relative z-20">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
          <div className="fixed inset-0 z-20 overflow-y-auto">
            <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
              <div className="relative w-full overflow-hidden text-left transition-all delay-1000 transform bg-white rounded-lg shadow-xl sm:my-8 sm:max-w-lg">
                <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
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

                <div className="px-4 py-3 bg-gray-50 sm:flex sm:flex-row-reverse sm:px-6">
                  {IS_CONFIRM_MODAL ? (
                    <>
                      <ModalButton
                        type="yes"
                        onClick={() => {
                          closeModal();
                          callback && callback();
                        }}
                      />
                      <ModalButton type="cancel" onClick={closeModal} />
                    </>
                  ) : (
                    <ModalButton
                      type="check"
                      onClick={callback || closeModal}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
