/* eslint-disable react/prop-types */
import Head from 'next/head';
import gql from 'graphql-tag';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import PaginationStyles from './styles/PaginationStyles';
import DisplayError from './DisplayError';
import { perPage } from '../config';

const PAGINATION_QUERY = gql`
  query {
    _allProductsMeta {
      count
    }
  }
`;
export default function Pagination({ page }) {
  const { data, loading, error } = useQuery(PAGINATION_QUERY);
  if (loading) return 'Loading.....';
  if (error) return <DisplayError error={error.message} />;

  const { count } = data._allProductsMeta;
  const pageCount = Math.ceil(count / perPage);

  return (
    <PaginationStyles>
      <Head>
        <title>Uzumaki Store - Page{page} of ___</title>
      </Head>

      <Link href={`/product/${page - 1}`}>
        <a aria-disabled={page <= 1}>⬅️ Prev</a>
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>{count} items Total</p>
      <Link href={`/product/${page + 1}`}>
        <a aria-disabled={page >= pageCount}>Next ➡️</a>
      </Link>
    </PaginationStyles>
  );
}
