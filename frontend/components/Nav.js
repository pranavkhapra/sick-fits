import React from 'react';
import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';
import SignOut from './SignOut';
import { useCart } from '../lib/cartState';
import CartCount from './CartCount';

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

          <button type="button" onClick={openCart}>
            My Cart
            {/* // basically in reduce we take a acc that is tally which //
            is returned as a single value and that value at each iteration is
            rembered // returning a single value */}
            <CartCount
              count={user.cart.reduce(
                (tally, cartItem) =>
                  tally + (cartItem.product ? cartItem.quantity : 0),
                0
              )}
            />
          </button>
          <SignOut />
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
