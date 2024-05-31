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
      const newUser = { user_id: userId, counter: 1 }; // Replace with the actual user data
      const { error: insertError } = await supabase
        .from('networth')
        .insert(newUser);

      if (insertError) {
        console.error("Record error:", insertError);
      } else {
     alert(`User with ID ${userId} recorded in Supabase`);
      }
    } else if (data) {
        

      const currentCounterValue = parseInt(data.counter);
     // alert(data.counter)
       
      const updatedCounterValue = currentCounterValue + 1;
      const { error: updateError } = await supabase
        .from('networth')
        .update({ counter: updatedCounterValue })
        .eq('id', data.id);

      if (updateError) {
        alert("Update counter error:", updateError);
      } else {
      alert("Networth updated successfully:", userId);
       // updateNetworthValue(updatedCounterValue);
      }
       
    
    
    }
  }
  return (
    <DynamicContextProvider
      settings={{
        environmentId: "c879278a-d3e2-4295-a59e-3ecf5a9695d3",
        walletConnectors: [EthereumWalletConnectors],
        events: {
          onAuthSuccess: async (args) => {
            const userId = args.primaryWallet.address;
            checkUserExists(userId);
          //  setIsFirstTime(true);
          }
        }
      }}
    >
      <Main isFirstTime={isFirstTime} />
    </DynamicContextProvider>
  );
};

export default App;
