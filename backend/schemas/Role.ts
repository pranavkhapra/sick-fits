import { text, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { permissionFields } from './fields';
import { permissions } from '../access';

export const Role = list({
  //   we need to hide ui of keystone based on person and all
  // now a normal person can change user privelage but we need to hide that down
  // limit access controls
  access: {
    create: permissions.canManageRoles,
    read: permissions.canManageRoles,
    update: permissions.canManageRoles,
    delete: permissions.canManageRoles,
  },
  // but user normal one can still able to see role like he knows there is somethign called role but what is it so we use these for hidding
  ui: {
    hideCreate: (args) => !permissions.canManageRoles(args),
    hideDelete: (args) => !permissions.canManageRoles(args),
    isHidden: (args) => !permissions.canManageRoles(args),
  },
  fields: {
    name: text({ isRequired: true }),
    // all of the permission fields of the fields.ts is now here so that we can
    // set the permission thing and all
    // you can basically now add diff role to this scpecific user and all
    // so now you can just create a role admin and then pass him all the
    // permission and then pass this role to the user in the user field of admin
    // import all the permissions
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
