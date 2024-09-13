'use client';

import React from 'react';
import ConnectWallet from './ConnectWallet';

const Header: React.FC = () => {
  return (
    <header
      className="flex items-center justify-between h-16 px-4 py-2" 
      style={{
        backgroundImage: 'bg-gradient-to-b from-[#051937] via-[#004d7a] to-[#008793]',
        color: 'white',
      }}
    >
      <div className="flex items-center space-x-4">
        {/* Add your logo here */}
        {/* <img 
          src="/images/logo.png" 
          alt="Logo"
          className="h-8 w-auto" 
        /> */}
        <div className="text-3xl sm:text-4xl md:text-4xl font-bold text-white">DAO</div>
      </div>

      {/* Connect Wallet Button */}
      <div className="flex items-center space-x-4">
        <ConnectWallet />
      </div>
    </header>
  );
};

export default Header;
