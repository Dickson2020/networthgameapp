import React, { useState, useEffect } from 'react';
import LeaderboardScore from './LeaderboardScore';
import { DynamicWidget, DynamicEmbeddedWidget, useUserWallets  } from "@dynamic-labs/sdk-react-core";
import supabase from './supabase'
import './App.css'

const Main = () => {
  const userWallets = useUserWallets()
  const counterValue = 0;
  const [showNetworth, setShowNetworth] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showHome, setShowHome] = useState(true);

    const [netWorthValue, updateNetworthValue] = useState(0);
 // Replace with the actual user ID you want to check
    const [userIdValue ,updateUserIdValue] = useState("")
  
  
useEffect(() => {
    if (userWallets.length > 0) {
      handleUpdateUserId();
      checkUserExists();
    }
  }, [userWallets]);
  
const checkUserExists = async () => {
  const { data, error } = await supabase
    .from('networth') // Replace with your actual table name
    .select('user_id')
    .eq('user_id', JSON.stringify(userIdValue) )
    .single();

  if (error && JSON.stringify( userIdValue) != null && JSON.stringify( userIdValue) != "") {
const newUser = { user_id: JSON.stringify( userIdValue) , counter: JSON.stringify( netWorthValue) }; // Replace with the actual user data
    const { error: insertError } = await supabase
      .from('networth')
      .insert(newUser);

    if (insertError) {
      alert("record error :"+JSON.stringify( insertError));
    } else {
      alert(`User with ID ${userIdValue} recorded in Supabase`);
    }

  }
  } else if (data) {
    alert(`User with ID ${userIdValue} : Increasing networth using Supabase and Prisma`);
const currentCounterValue = Number( data.counter) ;
    const updatedCounterValue = currentCounterValue + 1;
    const { error: updateError } = await supabase
      .from('networth')
      .update({ counter: updatedCounterValue })
      .eq('user_id', userIdValue);

    if (updateError) {
      alert("update counter error: "+JSON.stringify(updateError));
    } else {
      alert(`networth updated successfully`);
updateNetworthValue(updatedCounterValue)
      
    }
  
  } else {
    
  }
};



  

const NetworthPage = () => {
  handleUpdateUserId()
  checkUserExists();
  return (
    <div>
      <h1 style={{fontSize:"25px"}}><b> Net Worth</b>: {netWorthValue} Net</h1>
<h1><b>Account ID</b>: {userWallets[0].id}</h1>
 
  <div style={{width:"9px",height:"20px"}}> </div>

    </div>
  );
};
const Leaderboard = () => {
  const leaderboardData = [
    {
      rank: 1,
      address: '0x...',
      netWorth: 10000,
      change24h: 10,
      tokens: [
        { symbol: 'ETH', balance: 100 },
        { symbol: 'BTC', balance: 50 },
      ],
    },
    {
      rank: 2,
      address: '0x...',
      netWorth: 8000,
      change24h: -5,
      tokens: [
        { symbol: 'ETH', balance: 80 },
        { symbol: 'BTC', balance: 40 },
      ],
    },
    // ...
  ];

  return (
    <div className="leaderboard">
      {leaderboardData.map((data, index) => (
        <LeaderboardScore
          key={index}
          rank={data.rank}
          address={data.address}
          netWorth={data.netWorth}
          change24h={data.change24h}
          tokens={data.tokens}
        />
      ))}
    </div>
  );
};

  const handleViewNetworth = () => {
    setShowNetworth(true);
    setShowHome(false);
    setShowLeaderboard(false);
  };

const handleUpdateUserId = () => {
    updateUserIdValue(userWallets[0].id)
 // alert("User id stored")
};

  const handleViewHome = () => {
    setShowHome(true);
    setShowNetworth(false);
    setShowLeaderboard(false);
  };

  const handleViewLeaderboard = () => {
    setShowLeaderboard(true);
    setShowHome(false);
    setShowNetworth(false);
  };

  const isConnected = userWallets.some((wallet) => wallet.connected)

  return (
    <div>
      <div className="flex flex-col items-center justify-center text-center">
        {isConnected ? (
          <div className="flex justify-center mb-4">
            <div className="flex gap-4">
              <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded" onClick={handleViewHome}>My Wallet</button>
              <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded" onClick={handleViewLeaderboard}> Leaderboard</button>
            </div>
          </div>
        ) : (
          <h4>Networth Game Project</h4>
        )}
        {showLeaderboard === false && showHome && isConnected &&  <NetworthPage />
}


        {showLeaderboard === false && showHome && isConnected ? (
         <div>
          <DynamicEmbeddedWidget />

            </div>
        ) : (
          <div>
                  {isConnected == false && <DynamicEmbeddedWidget />}
</div>
        )}
        {showLeaderboard && <Leaderboard />}
      </div>
    </div>
  );
};

export default Main;
