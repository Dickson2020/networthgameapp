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
      checkUserExists(userId);
    }
  }, [userWallets]);

    const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  

  const fetchLeaderboardData = async () => {
    const { data, error } = await supabase
      .from('networth')
      .select()
      .order('counter', { ascending: false });

    if (error) {
      console.error(error);
    } else{
      setLeaderboardData(data);
    }
  };

  

  const checkUserExists = async (userId) => {
    const { data, error } = await supabase
      .from('networth') // Replace with your actual table name
      .select()
      .eq('user_id', userId)
      .single();

    if (error && userId.toString().length > 1) {
      const newUser = { user_id: userId, counter: 1 }; // Replace with the actual user data
      const { error: insertError } = await supabase
        .from('networth')
        .insert(newUser);

      if (insertError) {
        console.error("Record error:", insertError);
      } else {
        console.log(`User with ID ${userId} recorded in Supabase`);
      }
    } else if (data) {
        

      const currentCounterValue = parseInt(data.counter);
     // alert(data.counter)
       if (netWorthValue === 0) {
      const updatedCounterValue = currentCounterValue + 1;
      const { error: updateError } = await supabase
        .from('networth')
        .update({ counter: updatedCounterValue })
        .eq('id', data.id);

      if (updateError) {
        console.error("Update counter error:", updateError);
      } else {
        console.log("Networth updated successfully:", userId);
        updateNetworthValue(updatedCounterValue);
      }
       }
    
    
    }
  };

  const NetworthPage = () => {
    return (
      <div>
        <h1 style={{ fontSize: "25px" }}><b>Net Worth</b>: {netWorthValue} Net</h1>
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
          change24h=""
          tokens=""
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
          <h4>Networth Game Project</h4>
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
        
