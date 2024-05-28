import React, { useState } from 'react';

import { DynamicWidget, DynamicEmbeddedWidget, useUserWallets } from "@dynamic-labs/sdk-react-core";
import './App.css'

const Main = () => {
  const userWallets = useUserWallets()

    const [showNetworth, setShowNetworth] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showHome, setShowHome] = useState(false);

  
  const handleViewNetworth = () => {
    setShowNetworth(false);
        setShowHome(true);

    setShowLeaderboard(false);
  };

  const handleViewHome = () => {
    setShowHome(true);
    setShowHome(false);
            setShowHome(false);

  };

  const handleViewLeaderboard = () => {
    setShowNetworth(false);
            setShowHome(false);

    setShowLeaderboard(true);
  };

  const isConnected = userWallets.some((wallet) => wallet.connected)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center text-white">
      <div className="flex flex-col items-center justify-center text-center">
      {isConnected ? <div className="flex justify-center mb-4">
         <div className="flex gap-4">
    
      <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleViewHome()}>My Wallet</button>

  <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleViewNetworth()}>View Networth</button>
  <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleViewLeaderboard()}>View Leaderboard</button>
</div> </div> : '<h4>Networth Game Project</h4>'}
        {showHome && isConnected ? <DynamicEmbeddedWidget /> : <DynamicWidget />}
        

      {showNetworth && <NetworthPage />}
      {showLeaderboard && <LeaderboardPage />}
        
      </div>
    </div>
  );
};

export default Main;
