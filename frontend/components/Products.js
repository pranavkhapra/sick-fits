/* eslint-disable react/prop-types */
import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import Product from './Product';
import { perPage } from '../config';

export const ALL_PRODUCTS_QUERY = gql`
  # Write your query or mutation here
  #basically the variables we need for this query and all
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
    # //skip default value should be 0
    allProducts(first: $first, skip: $skip) {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;
const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;
function Products({ page }) {
  // it will return the data,errors or it is currently loading
  // use query it the hook we are using to get data
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    // pass the value of the variable
    variables: {
      // skip is basically like if we have like 123456 product and we are on
      // 2 page we want to skip 1,2 product 2 product per each page
      // current page multiply the perPage and then subtract with perpage
      // ex page =2 perPage =2 so skip=4-2=2 skip 2 product
      skip: page * perPage - perPage,
      // first is like per page value
      first: perPage,
    },
  });
  // console.log(data, error, loading);
  if (loading) return <p>Loading....</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <div>
      <ProductsListStyles>
        {data.allProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ProductsListStyles>
    </div>
  );
}

export default Products;
