import React, { useState, useEffect } from 'react';
import { 
  DynamicContextProvider, 
  useUserWallets 
} from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { mainnet } from "viem/chains";
import { DynamicEmbeddedWidget } from "@dynamic-labs/sdk-react-core";


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
            <DynamicEmbeddedWidget>
              <UserWalletsComponent />
            </DynamicEmbeddedWidget>
          </DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
}

const UserWalletsComponent = () => {
  const userWallets = useUserWallets();
  const [userIdValue, updateUserIdValue] = useState("");
  
  useEffect(() => {
    try {
      if (userWallets.length > 0) {
        const userId = userWallets[0].id;
        updateUserIdValue(userId);
        alert(JSON.stringify(userId));
        checkUserExists(userId);
      }
    } catch (err) {
      alert(JSON.stringify("error: " + err));
    }
  }, [userWallets]);

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

  return <div></div>;
};
