// basically in this a product link to an existing product
// user link to the user and quansity

import { integer, select, text, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { rules, isSignedIn } from '../access';

export const CartItem = list({
  access: {
    create: isSignedIn,
    read: rules.canOrder,
    update: rules.canOrder,
    delete: rules.canOrder,
  },
  // how the cart item will be displayed in keystone after creating and all
  ui: {
    listView: {
      initialColumns: ['product', 'quantity', 'user'],
    },
  },
  fields: {
    // TODO: custom label in here and all
    // how many of the items we will have
    quantity: integer({
      defaultValue: 1,
      isRequired: true,
    }),
    product: relationship({ ref: 'Product' }),
    // a two way relationship where the cart item is related to user and user to cart
    user: relationship({ ref: 'User.cart' }),
  },
});
