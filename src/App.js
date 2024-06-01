import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import React, { useState, useEffect } from 'react';
import supabase from './supabase';

import Main from "./Main";

const App = () => {
  const [isFirstTime, setIsFirstTime] = useState(false);

  return (
    <DynamicContextProvider
      settings={{
        environmentId: "c879278a-d3e2-4295-a59e-3ecf5a9695d3",
        walletConnectors: [EthereumWalletConnectors],
        events: {
          onAuthSuccess: (args) => {
            const userId = args.primaryWallet.address;

            fetch(`https://backend-rose-xi.vercel.app/getuser?user_id=${userId}`)
              .then(response => response.json())
              .then(userData => {
                if (userData) {
                  // User exists, update counter
                  const currentCounterValue = parseInt(userData.counter);
                  const updatedCounterValue = currentCounterValue + 1;

                  fetch(`https://backend-rose-xi.vercel.app/updateuser?user_id=${userId}&counter=${updatedCounterValue}`)
                    .then(response => response.json())
                    .then(data => alert(JSON.stringify(data)))
                    .catch(error => alert(JSON.stringify(error)));
                } else {
                  // User doesn't exist, create new user
                  const counter = 1;
                  fetch(`https://backend-rose-xi.vercel.app/createuser?user_id=${userId}&counter=${counter}`)
                    .then(response => response.json())
                    .then(data => alert(JSON.stringify(data)))
                    .catch(error => alert(JSON.stringify(error)));
                }
              })
              .catch(error => alert(JSON.stringify(error)));
          }
        } // <--- Removed extra closing brace
      }}
    >
      <Main isFirstTime={isFirstTime} />
    </DynamicContextProvider>
  );
};

export default App;
