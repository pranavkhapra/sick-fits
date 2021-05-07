import { text, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { permissionFields } from './fields';

export const Role = list({
  fields: {
    name: text({ isRequired: true }),
    // all of the permission fields of the fields.ts is now here so that we can
    // set the permission thing and all
    // you can basically now add diff role to this scpecific user and all
    // so now you can just create a role admin and then pass him all the
    // permission and then pass this role to the user in the user field of admin

    ...permissionFields,
    assignedTo: relationship({
      ref: 'User.role',
      many: true,
      ui: {
        itemView: { fieldMode: 'read' },
      },
    }),
  },
});
