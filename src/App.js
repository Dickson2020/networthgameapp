import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { useState } from 'react';


import Main from "./Main";

const App = () => (

    const [isFirstTime, setIsFirstTime] = useState(false);


  <DynamicContextProvider
    settings={{
      environmentId: "c879278a-d3e2-4295-a59e-3ecf5a9695d3",
      walletConnectors: [EthereumWalletConnectors],
      events: {
      onAuthSuccess: async (args) => {
        const userId = args.primaryWallet.address;
         alert(userId);
        setIsFirstTime(true);
      }
    }
    }}
  >
    <Main  isFirstTime={isFirstTime}  />
  </DynamicContextProvider>
);

export default App;
