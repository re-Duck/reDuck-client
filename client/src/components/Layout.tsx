import React, { useState } from 'react';
import Navigator from './Navigator';
import MenuView from './MenuView';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isClickedHamburger, setisClickedHamburger] = useState(false);

  return (
    <main className="w-full h-full">
      <MenuView
        isClickedHamburger={isClickedHamburger}
        setisClickedHamburger={setisClickedHamburger}
      />
      <Navigator setisClickedHamburger={setisClickedHamburger} />
      <main className="m-auto">{children}</main>
    </main>
  );
}
