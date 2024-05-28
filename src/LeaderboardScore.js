
import React from 'react';

const LeaderboardScore = ({ rank, address, netWorth, change24h, tokens }) => {
  return (
    <div className="leaderboard-score">
      <div className="rank">{rank}</div>
      <div className="address">{address}</div>
      <div className="net-worth">{netWorth} Net worth</div>
      <div className="tokens">
        {tokens.map((token, index) => (
          <div key={index}>
            <span>{token.symbol}</span>
            <span>{token.balance}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardScore;
