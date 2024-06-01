import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import React, { useState, useEffect } from 'react';
import supabase from './supabase';

import Main from "./Main";

const App = () => {
  const [isFirstTime, setIsFirstTime] = useState(false);

  const checkUserExists = async (userId) => {
    const { data, error } = await supabase
      .from('networth') // Replace with your actual table name
      .select()
      .eq('user_id', userId)
      .single();

    if (error && userId.toString().length > 1) {
      const userId = 'fdghfdgsf';
const counter = 1;

fetch(`https://backend-rose-xi.vercel.app/createuser?user_id=${userId}&counter=${counter}`)
  .then(response => response.json())
  .then(data => alert(JSON.stringify(data)))
  .catch(error => alert(JSON.stringify(error)));
      
    } else if (data) {
      const currentCounterValue = parseInt(data.counter);
      const updatedCounterValue = currentCounterValue + 1;
      const { error: updateError } = await supabase
        .from('networth')
        .update({ counter: updatedCounterValue })
        .eq('id', data.id);

      if (updateError) {
        alert("Update counter error:", updateError);
      } else {
        alert("Networth updated successfully:", userId);
      }
    }
  };

  return (
    <DynamicContextProvider
      settings={{
        environmentId: "c879278a-d3e2-4295-a59e-3ecf5a9695d3",
        walletConnectors: [EthereumWalletConnectors],
        events: {
          onAuthSuccess: async (args) => {
            const userId = args.primaryWallet.address;
            await checkUserExists(userId);
          }
        }
      }}
    >
      <Main isFirstTime={isFirstTime} />
    </DynamicContextProvider>
  );
};

export default App;
      
