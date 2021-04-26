import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import Product from './Product';

export const ALL_PRODUCTS_QUERY = gql`
  # Write your query or mutation here
  query ALL_PRODUCTS_QUERY {
    allProducts {
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
function Products() {
  // it will return the data,errors or it is currently loading
  // use query it the hook we are using to get data
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY);
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
