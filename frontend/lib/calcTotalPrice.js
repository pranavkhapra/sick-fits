export default function calcTotalPrice(cart) {
  // we will take the cart reduce the cart start at zero and then
  return cart.reduce((tally, cartItem) => {
    if (!cartItem.product) return tally; // products can be deleted,
    // but they could still be in your cart
    return tally + cartItem.quantity * cartItem.product.price;
  }, 0);
}
