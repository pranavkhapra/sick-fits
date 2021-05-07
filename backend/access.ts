// At its simplest, the access control returns a yes or no value depending on the users session
import { ListAccessArgs } from './types';

// this function have always have the access to context and inside
// the context we have user session
// list access args have the itemid and the session
export function isSignedIn({ session }: ListAccessArgs) {
  // if there is no session return false
  return !!session;
}

// // now we are going to check if someone haev some specific permission
// // each permission is a new function
// export const permissions = {
//   canManageProducts({ session }) {
//     return session?.data.role?.canManageProducts;
//   },
// };

const generatedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function ({ session }: ListAccessArgs) {
      return !!session?.data.role?.[permission];
    },
  ])
);

// Permissions check if someone meets a criteria - yes or no.
export const permissions = {
  ...generatedPermissions,
  isAwesome({ session }: ListAccessArgs): boolean {
    return session?.data.name.includes('wes');
  },
};
