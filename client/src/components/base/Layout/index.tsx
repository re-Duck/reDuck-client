import React, { useState } from 'react';
import Navigator from '../../common/Navigator';
import MenuView from '../../common/MenuView';

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
      <main className="p-4 pt-10 m-auto mt-8  bg-gray-50">{children}</main>
    </main>
  );
}
