import React from 'react';

interface IProp {
  color: string;
  children: React.ReactNode;
}

const AlertWrapper = ({ color, children }: IProp) => {
  const addedStyle = `border-${color}-300`;
  return (
    <div
      className={`${addedStyle} border fixed w-11/12 h-fit p-6 top-auto right-0 left-0 mx-auto bottom-2 z-20 rounded-lg bg-white sm:top-3 sm:right-3 sm:left-auto sm:mx-0 sm:w-fit`}
    >
      <div className="relative w-full inline-flex pr-8">{children}</div>
    </div>
  );
};

export default AlertWrapper;
