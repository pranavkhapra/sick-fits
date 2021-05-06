/* eslint-disable react/jsx-props-no-spreading */
import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/dist/client/router';
import { SearchStyles, DropDown, DropDownItem } from './styles/DropDown';

// just write a query for the item we want when we search and all
const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    # //putting th data in the searchTerms for easy reading
    searchTerms: allProducts(
      # basically the thing is that we will use this to find where the name and description is equal to the description of the
      # basically one of these because of the or when you want to use
      # the two term you can use and ,or we used or for two but you can use one also
      where: {
        OR: [
          { name_contains_i: $searchTerm }
          #   { description_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function Search() {
  // router for when we click to the item
  const router = useRouter();
  // we want to fire it when we want like mutation so we use lazy query

  // so understand one thing when we load thing the data should be here
  // undefined but as we type the things it will be the search term
  const [findItems, { loading, error, data }] = useLazyQuery(
    SEARCH_PRODUCTS_QUERY,
    // basically this means we are bypassing the apollo cache and always go to network
    // these results will not stored in cache
    // if we dont do it when we click the search thing it will show all things as they are in
    // cache
    {
      fetchPolicy: 'no-cache',
    }
  );
  // the searching terms and all
  const items = data?.searchTerms || [];
  // bascially for each term we are searching we are hitting th oninput value changes
  // and all we are just now we are bascially ddos our own site
  // so we say it to wait and certain time and then hit
  const findItemsButChill = debounce(findItems, 350);
  // server side rendering issue
  resetIdCounter();
  const {
    isOpen,
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    // items
    items,
    // when somebody types in the search
    onInputValueChange() {
      //   console.log('input changed');
      findItemsButChill({
        variables: {
          searchTerm: inputValue,
        },
      });
    },
    // when the somebody select item from the dropdown
    // give access to the selectedItem
    // what happen when we click or enter the item
    onSelectedItemChange({ selectedItem }) {
      //   console.log('selected item changed');
      // we need the page to be changed so we need the router and all
      router.push({
        pathname: `/product/${selectedItem.id}`,
      });
    },
    // beacuse when you try to make object into string
    itemToString: (item) => item?.name || '',
  });
  return (
    <>
      <SearchStyles>
        <div {...getComboboxProps()}>
          <input
            // anything you want in in the inut
            {...getInputProps({
              type: 'search',
              placeholder: 'Search for an Item',
              id: 'search',
              className: loading ? 'loading' : null,
            })}
          />
        </div>
        <DropDown {...getMenuProps()}>
          {/* //is open when we click the esc key and all */}
          {isOpen &&
            items.map((item, index) => (
              <DropDownItem
                key={item.id}
                {...getItemProps({ item, index })}
                // when we move our key to the item
                highlighted={index === highlightedIndex}
              >
                <img
                  src={item.photo.image.publicUrlTransformed}
                  alt={item.name}
                  width="50"
                />
                {item.name}
              </DropDownItem>
            ))}
          {/* //when the item is not there */}
          {isOpen && !items.length && !loading && (
            <DropDownItem>Sorry,No Items Found</DropDownItem>
          )}
        </DropDown>
      </SearchStyles>
    </>
  );
}
