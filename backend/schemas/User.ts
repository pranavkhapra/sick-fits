import { list } from '@keystone-next/keystone/schema';
import { text, password, relationship } from '@keystone-next/fields';
import { permissions, rules } from '../access';

// named export not export default name export is {}
export const User = list({
  // access:
  access: {
    create: () => true,
    read: rules.canManageUsers,
    update: rules.canManageUsers,
    // only people with the permission can delete themselves!
    // You can't delete yourself
    delete: permissions.canManageUsers,
  },
  // that..... should they be able to see keystone ui or not
  // ui
  ui: {
    // hide the backend UI from regular users
    hideCreate: (args) => !permissions.canManageUsers(args),
    hideDelete: (args) => !permissions.canManageUsers(args),
  },
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
    role: relationship({
      ref: 'Role.assignedTo',
      access: {
        create: permissions.canManageUsers,
        update: permissions.canManageUsers,
      },
    }),
    // TODO: add access controls
    products: relationship({
      ref: 'Product.user',
      many: true,
    }),
  },
});
