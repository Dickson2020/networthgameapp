import React, { useState } from 'react';
import LeaderboardScore from './LeaderboardScore';
import { DynamicWidget, DynamicEmbeddedWidget, useUserWallets  } from "@dynamic-labs/sdk-react-core";

import './App.css'

const Main = () => {
  const userWallets = useUserWallets()

  const [showNetworth, setShowNetworth] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showHome, setShowHome] = useState(true);

    const [netWorthValue, updateNetworthValue] = useState(0);

const NetworthPage = () => {
  return (
    <div>
      <h1 style={{fontSize:"25px"}}><b> Net Worth</b>: {netWorthValue} Net</h1>
<h1><b>Account ID</b>: {userWallets[0].id}</h1>
 
  

    </div>
  );
};
const Leaderboard = () => {
  const leaderboardData = [
    {
      rank: 1,
      address: '0x...',
      netWorth: 10000,
      change24h: 10,
      tokens: [
        { symbol: 'ETH', balance: 100 },
        { symbol: 'BTC', balance: 50 },
      ],
    },
    {
      rank: 2,
      address: '0x...',
      netWorth: 8000,
      change24h: -5,
      tokens: [
        { symbol: 'ETH', balance: 80 },
        { symbol: 'BTC', balance: 40 },
      ],
    },
    // ...
  ];

  return (
    <div className="leaderboard">
      {leaderboardData.map((data, index) => (
        <LeaderboardScore
          key={index}
          rank={data.rank}
          address={data.address}
          netWorth={data.netWorth}
          change24h={data.change24h}
          tokens={data.tokens}
        />
      ))}
    </div>
  );
};

  const handleViewNetworth = () => {
    setShowNetworth(true);
    setShowHome(false);
    setShowLeaderboard(false);
  };

  const handleViewHome = () => {
    setShowHome(true);
    setShowNetworth(false);
    setShowLeaderboard(false);
  };

  const handleViewLeaderboard = () => {
    setShowLeaderboard(true);
    setShowHome(false);
    setShowNetworth(false);
  };

  const isConnected = userWallets.some((wallet) => wallet.connected)

  return (
    <div>
      <div className="flex flex-col items-center justify-center text-center">
        {isConnected ? (
          <div className="flex justify-center mb-4">
            <div className="flex gap-4">
              <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded" onClick={handleViewHome}>My Wallet</button>
              <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded" onClick={handleViewLeaderboard}>View Leaderboard</button>
            </div>
          </div>
        ) : (
          <h4>Networth Game Project</h4>
        )}
        {showLeaderboard === false && showHome && isConnected ? (
         <div>
           <NetworthPage />
          <DynamicEmbeddedWidget />

            </div>
        ) : (
null        )}
        {showLeaderboard && <Leaderboard />}
      </div>
    </div>
  );
};

export default Main;
