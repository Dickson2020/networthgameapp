export default function App() {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: "c879278a-d3e2-4295-a59e-3ecf5a9695d3",
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>
            <div>
              <DynamicEmbeddedWidget />
              <MyComponentWrapper /> {/* Wrap MyComponent with MyComponentWrapper */}
            </div>
          </DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
}

const MyComponentWrapper = () => {
  return (
    <DynamicContextProvider>
      <MyComponent />
    </DynamicContextProvider>
  );
};

const MyComponent = () => {
  const isLoggedIn = useIsLoggedIn();
  const userWallets = useUserWallets();
  alert(JSON.stringify(userWallets));

  const checkUserExists = (userId) => {
    fetch(`https://backend-rose-xi.vercel.app/getuser?user_id=${userId}`)
      .then(response => response.json())
      .then(userData => {
        if (userData) {
          const currentCounterValue = parseInt(userData.counter);
          alert("fetched user: " + userData.counter);
        } else {
          alert("User not found");
        }
      })
      .catch(error => alert('Error fetching user:', error));
  };

  return (
    <div>
      {isLoggedIn ? (
        <p>You are logged!</p>
      ) : (
        <p>Please login.</p>
      )}
    </div>
  );
};
