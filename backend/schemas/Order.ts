/* eslint-disable*/

import { integer, text, relationship, virtual } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import formatMoney from '../lib/formatMoney';

export const Order = list({
  fields: {
    label: virtual({
        //label is the virtual one for the naming 
      // if we are using a  virtual that is basically not in the data base so we are using this
      //   to tell what it is going to return
      graphQLReturnType: 'String',
      //what will shown as label and  all
      resolver(item) {
        return `${formatMoney(item.total)}`;
      },
    }),
    total: integer(),
    // relationship with the orderItem.order many is true means order can have many item but not order item
    // 2 way relationship
    items: relationship({ ref: 'OrderItem.order', many: true }),
    user: relationship({ ref: 'User.orders' }),
    // a charge is a text filed ch_111232112
    charge: text(),
  },
});
