/* eslint-disable react/prop-types */
import { useContext, useState, createContext } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider({ children }) {
  // this is the own custome provider and all
  // we will store the state and the functionality and anyone can access this via the consumer
  const [cartOpen, setCartOpen] = useState(false);
  function toggleCart() {
    setCartOpen(!cartOpen);
  }

  function closeCart() {
    setCartOpen(false);
  }

  function openCart() {
    setCartOpen(true);
  }

  return (
    <LocalStateProvider
      value={{
        //   we need to send the carOpen and also the setCartopen there
        cartOpen,
        setCartOpen,
        toggleCart,
        openCart,
        closeCart,
      }}
    >
      {children}
    </LocalStateProvider>
  );
}
// make the custom hook for accessing the cart local state
function useCart() {
  // we use the consumer here to access the local state
  const all = useContext(LocalStateContext);
  return all;
}
export { CartStateProvider, useCart };
