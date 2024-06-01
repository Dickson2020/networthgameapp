import React, { useState, useEffect } from 'react';
import LeaderboardScore from './LeaderboardScore';
import { DynamicWidget, DynamicEmbeddedWidget, useUserWallets } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { mainnet } from "viem/chains";
import supabase from './supabase';
import './App.css';

const config = createConfig({
  chains: [mainnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();

const Main = ({ isFirstTime }) => {
  const userWallets = useUserWallets();
  const [showNetworth, setShowNetworth] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showHome, setShowHome] = useState(true);
  const [netWorthValue, updateNetworthValue] = useState(0);
  const [userIdValue, updateUserIdValue] = useState("");

  useEffect(() => {
    if (userWallets.length > 0) {
      const userId = userWallets[0].id;
      updateUserIdValue(userId);
      alert(JSON.stringify(userWallets))
  //    checkUserExists(userId);
    }
  }, [userWallets]);

  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
  const response = await fetch(`https://backend-rose-xi.vercel.app/getusers`);
  const userData = await response.json();

  if (userData) {
    const sortedData = userData.sort((a, b) => b.counter - a.counter);
    setLeaderboardData(sortedData);
  } else {
    console.error("Error fetching data");
  }
};
  const checkUserExists = async (userId) => {
    alert("hi");
  const response = await fetch(`https://backend-rose-xi.vercel.app/getuser?user_id=${userId}`);
  const userData = await response.json();

  if (userData) {
    const currentCounterValue = parseInt(userData.counter);
    alert("fetched user: "+ userData.counter)
    updateNetworthValue(currentCounterValue);
  } else {
    alert("User not found");
  }
};

  const NetworthPage = () => {
    return (
      <div>
        <h1 style={{ fontSize: "25px" }}><b>Net Worth</b>: {netWorthValue} Net</h1>
        <h1 style={{ fontSize: "25px" }}><b>My Multiplier</b>: {netWorthValue} Net</h1>
        {userWallets[0] && <h1><b>Account ID</b>: {userWallets[0].id}</h1>}
      </div>
    );
  };

  const Leaderboard = () => {
    return (
      <div className="leaderboard">
        {leaderboardData.map((data, index) => (
          <LeaderboardScore
            key={index}
            rank={data.counter}
            address={data.user_id}
            netWorth={data.counter}
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

  const isConnected = userWallets.some((wallet) => wallet.connected);

  return (
    <div>
      <div className="flex flex-col items-center justify-center text-center">
        {isConnected ? (
          <div className="flex justify-center mb-4">
            {userWallets.map((wallet) => (
              <p key={wallet.address}>{JSON.stringify(wallet.tokenBalances)}</p>
            ))}
            <div className="flex gap-4">
              <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded" onClick={handleViewHome}>My Wallet</button>
              <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded" onClick={handleViewLeaderboard}>Leaderboard</button>
            </div>
          </div>
        ) : (
         Networth Game
        )}
        {showLeaderboard === false && showHome && isConnected && <NetworthPage />}

        {showLeaderboard === false && showHome && isConnected ? (
          <div>
            <WagmiProvider config={config}>
              <QueryClientProvider client={queryClient}>
                <DynamicWagmiConnector>
                  <DynamicEmbeddedWidget />
                </DynamicWagmiConnector>
              </QueryClientProvider>
            </WagmiProvider>
          </div>
        ) : (
          <div>
            {isConnected === false && <DynamicEmbeddedWidget />}
          </div>
        )}
        {showLeaderboard && <Leaderboard />}
      </div>
    </div>
  );
};

export default Main;
