import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

import Main from "./Main";

const App = () => (
  <DynamicContextProvider
    settings={{
      environmentId: "c879278a-d3e2-4295-a59e-3ecf5a9695d3",
      walletConnectors: [EthereumWalletConnectors],
    }}
  >
    <Main />
  </DynamicContextProvider>
);

export default App;
