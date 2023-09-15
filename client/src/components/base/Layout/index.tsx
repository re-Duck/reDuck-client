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
      <main className="min-h-screen m-auto pt-14 bg-gray-50">{children}</main>
    </main>
  );
}
