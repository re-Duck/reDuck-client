import React, { useState } from 'react';
import Navigator from '../Navigator';
import MenuView from '../MenuView';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isClickedHamburger, setisClickedHamburger] = useState(false);

  return (
    <main className="w-full h-full">
      <MenuView isClickedHamburger={isClickedHamburger} />
      <Navigator setisClickedHamburger={setisClickedHamburger} />
      <main className="m-auto bg-gray-50 mt-14 p-4 pt-10">{children}</main>
    </main>
  );
}
