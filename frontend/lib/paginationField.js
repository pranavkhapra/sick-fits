/* eslint-disable no-plusplus */
import { PAGINATION_QUERY } from '../components/Pagination';

// First thing it does it asks the read function for those items.
// We can either do one of two things:
// First things we can do is return the items because they are already in the cache
// The other thing we can do is to return false from here, that will make a (network request)
// will return to false and then the apollo will fetch the item to the keystone and then in merge it will say that
// you send me the false so i went my own and then it will run merge
// but where in cache we want to place
export default function paginationField() {
  return {
    keyArgs: false,
    // tells apollo we will take care of everything
    // existing item in the cache
    // args is the first and skip value of products
    // and cache is the cache itself
    read(existing = [], { args, cache }) {
      // console.log({ existing, args, cache });
      const { skip, first } = args;

      // Read the number of items on the page from the cache
      // we will pull the query from cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // Check if we have existing items
      // filter if undefined
      const items = existing.slice(skip, skip + first).filter((x) => x);
      // If
      // There are items
      // AND there aren't enough items to satisfy how many were requested
      // AND we are on the last page
      // THEN JUST SEND IT

      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      // We don't have any items, we must go to the network to fetch them
      // the thing we explained and all
      if (items.length !== first) {
        return false;
      }

      // If there are items, just return them from the cache, and we don't need to go to the network
      if (items.length) {
        // console.log(
        //   `There are ${items.length} items in the cache! Gonna send them to apollo`
        // );
        return items;
      }

      return false; // fallback to network
    },
    // then when we got the false we also need to have this merge thing
    // when we come back from the network and all
    // the incoming have the item from the network
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      // This runs when the Apollo client comes back from the network with our product
      // console.log(`MErging items from the network ${incoming.length}`);
      // if their are existing item in the array and all
      // then we want to merge them
      // but we don't push there because we are dealing with the pagination
      // when someone has go to the 4 page directly
      // so we need to put the blank state there for the items
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      // console.log(merged);
      // Finally we return the merged items from the cache,
      return merged;
    },
  };
}
