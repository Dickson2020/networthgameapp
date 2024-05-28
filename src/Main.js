import { DynamicWidget, useWallet } from "@dynamic-labs/sdk-react-core";

const Main = () => {
  const { isConnected, account } = useWallet();

  if (isConnected) {
    // Fetch token balances for the connected account
    const tokenBalances = getTokenBalances(account); // Implement this function to fetch token balances

    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center text-white">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold mb-4">Networth + Web3 by Dickson</h1>
          <div className="token-balances">
            {tokenBalances.map((tokenBalance) => (
              <div key={tokenBalance.tokenAddress}>
                <p>{tokenBalance.tokenSymbol}: {tokenBalance.balance}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center text-white">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold mb-4">Networth + Web3 by Dickson</h1>
          <DynamicWidget />
        </div>
      </div>
    );
  }
};

export default Main;
