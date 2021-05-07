import { list } from '@keystone-next/keystone/schema';
import { text, password, relationship } from '@keystone-next/fields';

// named export not export default name export is {}
export const User = list({
  // access:
  // that..... should they be able to see keystone ui or not
  // ui
  fields: {
    name: text({
      isRequired: true,
    }),
    email: text({
      isRequired: true,
      isUnique: true,
    }),
    password: password(),
    // the cart filed for the cartitem and all
    cart: relationship({
      ref: 'CartItem.user',
      many: true,
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'read' },
      },
    }),
    orders: relationship({ ref: 'Order.user', many: true }),
    // todo roles cart and orders of the user
    // because we need the user in the role and the role in the user
    role: relationship({ ref: 'Role.assignedTo' }),
  },
});
