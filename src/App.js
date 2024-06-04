import React, { useState, useEffect } from 'react';
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { mainnet } from "viem/chains";
import { DynamicEmbeddedWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useIsLoggedIn } from '@dynamic-labs/sdk-react-core';
import './App.css';
import { useTokenBalances } from "@dynamic-labs/sdk-react-core";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://vviemvanlsxkhlcjrofx.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2aWVtdmFubHN4a2hsY2pyb2Z4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY5MjUxMjgsImV4cCI6MjAzMjUwMTEyOH0.WyzYnC4Rg9zMYT-T5pLVc6vMg58AN98SGpqbCnZzQNA");

const config = createConfig({
  chains: [mainnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function App() {
  
  return (
    <DynamicContextProvider
      settings={{
        environmentId: "c879278a-d3e2-4295-a59e-3ecf5a9695d3",
        walletConnectors: [EthereumWalletConnectors],
         newToWeb3WalletChainMap: {
        1: ['metamask', 'walletconnect'],
        137: ['metamask', 'walletconnect'],
        56: ['metamask', 'walletconnect'],
        80001: ['metamask', 'walletconnect'],
      },
       events: {
      
        onAuthSuccess: () => {
          
          
        }
      }
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>
            <div>
                <MyComponent />

              <DynamicEmbeddedWidget />
            </div>
          </DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
}



const MyComponent = () => {
  const isLoggedIn = useIsLoggedIn();
 const { user } = useDynamicContext();
const [userIdValue, updateUserIdValue] = useState("");
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [netWorthValue, updateNetworthValue] = useState(1);
  const [totalBalance, setTotalBalance] = useState(0);
const [connectedId, setConnectedId] = useState("loading");
  const [sessionIdValue, setSessionIdValue] = useState("")
  const { tokenBalances, isLoading, isError, error } = useTokenBalances();
/*
  
if(tokenBalances){
  
  console.log(JSON.stringify(tokenBalances))

  const total = tokenBalances.reduce((acc, current) => acc + current.balance, 0);

  setTotalBalance(total);
  
}
  */
  const Leaderboard = () => {

      const [showLeaderboard, setShowLeaderboard] = useState(false);

  return (
    <div style={{padding:"20px"}}>
  <button
          style={{
            backgroundColor: '#007bff',
            color: '#ffffff',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        
    onClick={() => setShowLeaderboard(!showLeaderboard)}>
        {showLeaderboard ? 'Hide Leaderboard' : 'View Leaderboard'}
      </button>
  {showLeaderboard && (
    <table className="table table-striped table-hover">
<table className="table table-striped table-hover">
<thead className="thead-dark">
<tr>
<th scope="col">Rank </th>
<th scope="col">Chain Address</th>
<th scope="col">Multiplier Net</th>
</tr>
</thead>
<tbody>
{leaderboardData.map((item, index) => (
<tr key={index}>
<th scope="row">Rank position: {item.rank}</th>
<td>{item.user_id}</td>
<td>{item.counter}</td>
</tr>
))}
</tbody>
</table>    </table>
  )}
</div>
  );
};

useEffect(() => {
  fetch('https://backend-rose-xi.vercel.app/getusers')
    .then(response => response.json())
    .then(data => {
      const sortedData = data.sort((a, b) => b.counter - a.counter).map((item, index) => ({
        ...item,
        rank: index + 1,
      }));
      setLeaderboardData(sortedData);
    }).catch(error => {
          
          fetch('https://backend-rose-xi.vercel.app/getusers')
    .then(response => response.json())
    .then(data => {
      const sortedData = data.sort((a, b) => b.counter - a.counter).map((item, index) => ({
        ...item,
        rank: index + 1,
      }));
      setLeaderboardData(sortedData);
    })
      

        });
}, []);
  
  
useEffect(() => {
    if (user != null) {
      const userId = user.userId;
      const session_id = user.sessionId;
      
      updateUserIdValue(userId);
    //  setSessionIdValue(session_id);
     //  alert("session id x: "+sessionIdValue)
      checkUserExists(userId, session_id);
      setConnectedId(userId)
  }
    
  }, [user]); 
  
 const checkUserExists = (userId, session_id) => {
// alert("session id: "+session_id)
   
   
   
   fetch("https://backend-rose-xi.vercel.app/getuser?user_id="+userId)
    .then(response => response.json())
    .then(userData => {
      if (userData) {
        const currentCounterValue = parseInt(userData.counter);
    
      const { data, error } = await supabase
  .from('networth')
  .update({ counter: (currentCounterValue + 1)})
  .eq('user_id', userId);

if (error) {
  alert(`Error updating row: ${error.message}`);
} else {
  alert(`Row updated successfully!`);
}
        
        
        updateNetworthValue(currentCounterValue);
   
      } else {
        const newUserId = userId; // Replace with the actual new user ID
        const counter = 1;
        
        console.log("session id: "+ session_id)
        fetch("https://backend-rose-xi.vercel.app/createuser?user_id="+newUserId+"&counter="+counter)
          .then(response => response.json())
          .then(createdUserData => {
            console.log(`Created new user with ID ${newUserId} and counter ${counter}`);
          })
          .catch(error => {
         //   console.log('Error creating user:', error);
            checkUserExists(userId, session_id); // Recursive call to retry
          });
      }
    })
    .catch(error => {
      console.log('Error fetching user:', error);
      checkUserExists(userId, session_id); // Recursive call to retry
    });
};
  return (
   <div>
  {isLoggedIn ? (
    <div>
     <div className="wallet-balances">
<p>
    <span>Account ID: </span>
    <span> {connectedId} </span>
  </p>
    
    <p>
    <span>Multiplier: </span>
    <span>{netWorthValue} MUL</span>
  </p>
  <p>
    <span>Networth: </span>
    <span>
  {totalBalance + netWorthValue} NET
  <span style={{ fontSize:'11px', color: 'green', fontSize: 'smaller' }}>
    (+ {netWorthValue.toLocaleString()} login multiplier)
  </span>
</span>
    </p>
</div>

<Leaderboard/>
    </div>
  ) : (
    <></> // Don't display anything if not logged in
  )}
</div>
  );
};
