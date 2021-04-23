/* eslint-disable react/prop-types */
import React from 'react';
import Header from './Header';

function Page({ children }) {
  // children are basically the things inside the pages and all so that it can be rendered insdie page component
  return (
    <>
      <p>Yo the Page Component</p>
      <Header />
      {children}
    </>
  );
}

export default Page;
