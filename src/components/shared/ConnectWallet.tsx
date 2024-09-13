'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ethers } from 'ethers';

const ConnectWallet = () => {
  const router = useRouter();
  const [isConnected, setIsConnected] = useState(false); // State to track wallet connection

  const connectWalletHandler = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        // Check if MetaMask is connected
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });

        if (accounts.length > 0) {
          // Wallet is already connected
          setIsConnected(true);
          router.push('/MyOrganization');
        } else {
          // Request connection to MetaMask
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          setIsConnected(true);
          router.push('/MyOrganization');
        }
      } catch (error) {
        console.error('Error connecting wallet:', error);
        alert('Failed to connect wallet. Please check your MetaMask.');
      }
    } else {
      // MetaMask is not installed
      alert('MetaMask is not installed. Please install MetaMask to proceed.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-#051937-100 to-purple-200">
      <div className="shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect Your Wallet</h2>
        <p className="text-white mb-6">Connect your MetaMask wallet to get started with your organization dashboard.</p>
        <button
          onClick={connectWalletHandler}
          className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:bg-gradient-to-l text-white text-lg font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-pink-300"
        >
          {isConnected ? 'Connected' : 'Connect Wallet'}
        </button>
      </div>
    </div>
  );
};

export default ConnectWallet;
