import { DynamicWidget, DynamicEmbeddedWidget, useUserWallets } from "@dynamic-labs/sdk-react-core";
import './App.css'

const Main = () => {
  const userWallets = useUserWallets()

  const isConnected = userWallets.some((wallet) => wallet.connected)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center text-white">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold mb-4">{isConnected ? 'Hi, welcome' : 'Login'}</h1>
        {isConnected ? <DynamicEmbeddedWidget /> : <DynamicWidget />}
        
        <div>
          <h1>Connected wallets</h1>

          {userWallets.map((wallet) => (
            <p key={wallet.id}>
              {wallet.address}: {wallet.connected ? 'Connected' : 'Not connected'}
            </p>
          ))}
        </div>
        <div className="flex justify-center mb-4">
          <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Wallet</button>
          <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Leaderboard</button>
        </div>
      </div>
    </div>
  );
};

export default Main;
