import { integer, relationship, select, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const Product = list({
  // TODO
  // access
  fields: {
    name: text({ isRequired: true }),
    // for descripiton you need a ui for the display mode
    description: text({
      ui: { displayMode: 'textarea' },
    }),
    photo: relationship({
      ref: 'ProductImage.product',
      // ui basically how you can see the thing and all
      ui: {
        // basically here we can create something in the product image from product so you dont have to go everytime and then create something in the productImage
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: { fields: ['image', 'altText'] },
        inlineEdit: { fields: ['image', 'altText'] },
      },
    }),
    // a status when you need to work on adding a product but you want to show until its complete
    // select is the dropdown and the object insides are the option to select and all
    status: select({
      options: [
        { label: 'Draft', value: 'Draft' },
        { label: 'Available', value: 'AVAILABLE' },
        { label: 'unvailable', value: 'UNAVAILABLE' },
      ],
      defaultValue: 'DRAFT',
      ui: {
        // the small one at the right to create something and all so small and fast and then when you need to edit you can just edit out the stuff in the edit with full bar
        displayMode: 'segmented-control',

        // when you just want to create the product and you just want to skip other things and then go back and add them
        // like when you want to bascially hide the status and all
        // createView: { fieldMode: 'hidden' },
      },
    }),
    price: integer(),
    // TODO ADD THE PHOTO THAT WOULD BE A RELATIONSHIP
  },
});
