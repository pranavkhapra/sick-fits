import React from 'react';
import Pagination from '../components/Pagination';
import Products from '../components/Products';

function ProductPage() {
  return (
    <div>
      {/* the current page we are on */}
      <Pagination page={1} />
      <Products />
      <Pagination page={1} />
    </div>
  );
}

export default ProductPage;
