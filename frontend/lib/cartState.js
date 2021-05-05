import { createContext } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function cartStateProvider({ children }) {
  // this is the own custome provider and all
  // we will store the state and the functionality and anyone can access this via the consumer
  const cartOpen = true;
  return (
    <LocalStateProvider
      value={{
        cartOpen,
      }}
    >
      {children}
    </LocalStateProvider>
  );
}
export { cartStateProvider };
