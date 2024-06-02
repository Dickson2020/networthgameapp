import React, { useState, useEffect } from 'react';
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { mainnet } from "viem/chains";
import { DynamicEmbeddedWidget,useUserWallets } from "@dynamic-labs/sdk-react-core";


const config = createConfig({
  chains: [mainnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function App() {

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
  // checkUserExists(userId);
    }
  }, [userWallets]);
  
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
           <DynamicEmbeddedWidget />
          </DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
    }
