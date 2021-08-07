import { integer, relationship, select, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { isSignedIn, rules } from '../access';

export const OrderItem = list({
  access: {
    create: isSignedIn,
    read: rules.canManageOrderItems,
    update: () => false,
    delete: () => false,
  },
  fields: {
    name: text({ isRequired: true }),
    // for descripiton you need a ui for the display mode
    description: text({
      ui: { displayMode: 'textarea' },
    }),
    photo: relationship({
      ref: 'ProductImage',
      // ui basically how you can see the thing and all
      ui: {
        // basically here we can create something in the product image from product so you dont have to go everytime and then create something in the productImage
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: { fields: ['image', 'altText'] },
        inlineEdit: { fields: ['image', 'altText'] },
      },
    }),
    price: integer(),
    quantity: integer(),
    // the relationshipwith order file schema
    order: relationship({ ref: 'Order.items' }),
  },
});
