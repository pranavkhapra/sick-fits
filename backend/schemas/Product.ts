import { integer, select, text } from '@keystone-next/fields';
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
