
import React from 'react';

const LeaderboardScore = ({ rank, address, netWorth }) => {
  return (
    <div className="leaderboard-score">
      <div className="rank">{rank}</div>
      <div className="address">{address}</div>
      <div className="net-worth">{netWorth} Net worth</div>
      
    </div>
  );
};

export default LeaderboardScore;
