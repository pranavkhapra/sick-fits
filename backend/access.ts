// At its simplest, the access control returns a yes or no value depending on the users session
import { ListAccessArgs } from './types';
import { permissionsList } from './schemas/fields';

// this function have always have the access to context and inside
// the context we have user session
// list access args have the itemid and the session
export function isSignedIn({ session }: ListAccessArgs) {
  // if there is no session return false
  return !!session;
}

const generatedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function ({ session }: ListAccessArgs) {
      return !!session?.data.role?.[permission];
    },
  ])
);
// Permissions check if someone meets a criteria - yes or no.
// additional permssionn function rather than and all
export const permissions = {
  ...generatedPermissions,
  isAwesome({ session }: ListAccessArgs): boolean {
    return session?.data.name.includes('pranav');
  },
};

// Rule based function
// used for list items
// Rules can return a boolean - yes or no - or a filter which limits which products they can CRUD.
// admin can do the thing or you are the owner of the item
export const rules = {
  // it always have a context that have session and all
  canManageProducts({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    // 1. Do they have the permission of canManageProducts
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    // 2. If not, do they own this item?
    return { user: { id: session.itemId } };
  },
  canOrder({ session }: ListAccessArgs) {
    // 1. Do they have the permission of canManageProducts
    if (permissions.canManageCart({ session })) {
      return true;
    }
    // 2. If not, do they own this item?
    return { user: { id: session.itemId } };
  },
  canManageOrderItems({ session }: ListAccessArgs) {
    // 1. Do they have the permission of canManageProducts
    if (permissions.canManageCart({ session })) {
      return true;
    }
    // 2. If not, do they own this item?
    return { order: { user: { id: session.itemId } } };
  },
  //   people who can read all product can see all product that are sold or unavailable
  canReadProducts({ session }: ListAccessArgs) {
    if (permissions.canManageProducts({ session })) {
      return true; // They can read everything!
    }
    // They should only see available products (based on the status field)
    return { status: 'AVAILABLE' };
  },
};
