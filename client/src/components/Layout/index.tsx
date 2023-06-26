import React, { useState } from 'react';
import Navigator from '../Navigator';
import MenuView from '../MenuView';

interface IProps {
  children: React.ReactNode;
  viewList?: boolean;
}

export default function Layout({ children, viewList = true }: IProps) {
  const [isClickedHamburger, setisClickedHamburger] = useState(false);

  return (
    <main className="w-full h-full">
      <MenuView isClickedHamburger={isClickedHamburger} viewList={viewList} />
      <Navigator
        setisClickedHamburger={setisClickedHamburger}
        viewList={viewList}
      />
      <main className="m-auto bg-gray-50 mt-8 p-4 pt-10 min-h-screen">
        {children}
      </main>
    </main>
  );
}
