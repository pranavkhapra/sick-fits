/* eslint-disable react/prop-types */
import React from 'react';
import UpdateProduct from '../components/UpdateProduct';

// we get the query prop here from the url created by update page
function UpdatePage({ query }) {
  return (
    <div>
      <UpdateProduct id={query.id} />
    </div>
  );
}

export default UpdatePage;
