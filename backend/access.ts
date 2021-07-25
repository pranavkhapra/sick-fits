// At its simplest, the access control returns a yes or no value depending on the users session
import { ListAccessArgs } from './types';

// this function have always have the access to context and inside
// the context we have user session
// list access args have the itemid and the session
export function isSignedIn({ session }: ListAccessArgs) {
  // if there is no session return false
  return !!session;
}
