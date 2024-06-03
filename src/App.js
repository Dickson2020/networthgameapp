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
      
        onAuthSuccess: (args) => {
          const userId = args.primaryWallet.address

            fetch(`https://backend-rose-xi.vercel.app/getuser?user_id=${userId}`)
  .then(response => response.json())
  .then(userData => {
    if (userData) {
      const currentCounterValue = parseInt(userData.counter) + 1
 console.log(userData);
  console.log("user id: "+userId)    
 fetch(`https://backend-rose-xi.vercel.app/updateuser?user_id=${userId}&counter=${currentCounterValue}`)
        .then(response => response.json())
        .then(createdUserData => {
          console.log(` user updated with ID`);
        })
        .catch(error => console.log('Error creating user:', error));
      
    } else {
      const newUserId = userId; // Replace with the actual new user ID
      const counter = 1;
      fetch(`https://backend-rose-xi.vercel.app/createuser?user_id=${newUserId}&counter=${counter}`)
        .then(response => response.json())
        .then(createdUserData => {
          console.log(`Created new user with ID`);
        })
        .catch(error => console.log('Error creating user:', error));
    }
  })
  .catch(error => console.log('Error fetching user:', error));

          
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
const [connectedId, setConnectedId] = useState("");
  
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
    <div className="leaderboard">
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
<th scope="col">Rank</th>
<th scope="col">Address</th>
<th scope="col">Multiplier</th>
</tr>
</thead>
<tbody>
{leaderboardData.map((item, index) => (
<tr key={index}>
<th scope="row">{item.rank}</th>
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
      updateUserIdValue(userId);
      checkUserExists(userId);
      setConnectedId(userId);
    }
  }, [user]); 
  
 const checkUserExists = (userId) => {
  fetch(`https://backend-rose-xi.vercel.app/getuser?user_id=${userId}`)
    .then(response => response.json())
    .then(userData => {
      if (userData) {
        const currentCounterValue = parseInt(userData.counter)+1;
        console.log(userData);
  console.log("user id: "+userData.user_id)    
 fetch("https://backend-rose-xi.vercel.app/updateuser?user_id="+userData.user_id+"&counter="+currentCounterValue)
        .then(response => console.log("update res: "+response)
        updateNetworthValue(currentCounterValue);
      } else {
        const newUserId = userId; // Replace with the actual new user ID
        const counter = 1;
        fetch(`https://backend-rose-xi.vercel.app/createuser?user_id=${newUserId}&counter=${counter}`)
          .then(response => response.json())
          .then(createdUserData => {
            console.log(`Created new user with ID ${newUserId} and counter ${counter}`);
          })
          .catch(error => {
            console.log('Error creating user:', error);
            checkUserExists(userId); // Recursive call to retry
          });
      }
    })
    .catch(error => {
      console.log('Error fetching user:', error);
      checkUserExists(userId); // Recursive call to retry
    });
};
  return (
   <div>
  {isLoggedIn ? (
    <div>
     <div className="wallet-balances">
<p>
    <span>Account ID:</span>
    <span>{connectedId} </span>
  </p>
    
    <p>
    <span>Multiplier:</span>
    <span>{netWorthValue} MUL</span>
  </p>
  <p>
    <span>Networth:</span>
    <span>
  {totalBalance + netWorthValue} NET
  <span style={{ color: 'green', fontSize: 'smaller' }}>
    (+ {netWorthValue.toLocaleString()} mul)
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
