import { useRouter } from 'next/dist/client/router';
import React from 'react';
import Pagination from '../components/Pagination';
import Products from '../components/Products';
// and then in product.js page file
// you have access to the query withRouter not because of folder structure
function ProductPage() {
  const { query } = useRouter();
  const page = parseInt(query.page);
  // console.log(page);
  return (
    <div>
      {/* the current page we are on */}
      {/* we will send this to the pagination and all */}
      <Pagination page={page || 1} />
      <Products page={page || 1} />
      <Pagination page={page || 1} />
    </div>
  );
}

export default ProductPage;
