import React from 'react';

interface IMenuView {
  isClickedHamburger: boolean;
  setisClickedHamburger: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MenuView({ isClickedHamburger, setisClickedHamburger }: IMenuView) {
  return (
    <>
      {isClickedHamburger && (
        <div className="fixed z-10 w-screen h-screen bg-red-400 md:hidden">
          <button onClick={() => setisClickedHamburger(false)}>x</button>
        </div>
      )}
    </>
  );
}
