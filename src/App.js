import React, { useState, useEffect } from 'react';
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { mainnet } from "viem/chains";
import { DynamicEmbeddedWidget, useUserWallets } from "@dynamic-labs/sdk-react-core";
import { useIsLoggedIn } from '@dynamic-labs/sdk-react-core';


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

   const userWallets = useUserWallets();

     alert(JSON.stringify(userWallets))

   
 const checkUserExists = (userId) => {
  fetch(`https://backend-rose-xi.vercel.app/getuser?user_id=${userId}`)
    .then(response => response.json())
    .then(userData => {
      if (userData) {
        const currentCounterValue = parseInt(userData.counter);
        alert("fetched user: " + userData.counter);
      } else {
        alert("User not found");
      }
    })
    .catch(error => alert('Error fetching user:', error));
};

 
  return (
    <div>
      {isLoggedIn ? (
        <p>You are logged!</p>
      ) : (
        <p>Please login.</p>
      )}
    </div>
  );
};
