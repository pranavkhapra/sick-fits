import React from 'react';
import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';
import SignOut from './SignOut';
import { useCart } from '../lib/cartState';

function Nav() {
  // the hook to get the user query for the things and all
  // which you can pass it in the Link of the page
  const user = useUser();
  const { openCart } = useCart();
  return (
    <NavStyles>
      {user && (
        <>
          <Link href="/products">Products</Link>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <SignOut />
          <button type="button" onClick={openCart}>
            My Cart
          </button>
        </>
      )}
      {!user && (
        <>
          <Link href="/signin">Sign In/Sign Up</Link>
        </>
      )}
    </NavStyles>
  );
}

export default Nav;
