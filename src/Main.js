import { DynamicWidget, DynamicEmbeddedWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";

const Main = () => {
  const dynamicContext = useDynamicContext();

  if (dynamicContext?.wallet?.connected) {
    // Fetch token balances for the connected account

    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center text-white">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold mb-4">Hi, welcome</h1>
          <DynamicEmbeddedWidget />
       <div className="flex justify-center mb-4">
          <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Wallet</button>
          <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Leaderboard</button>
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
