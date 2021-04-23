import Link from 'next/link';
import React from 'react';
import Nav from './Nav';

function Header() {
  return (
    <header>
      <div className="bar">
        <Link href="/">Uzumaki Store</Link>
      </div>
      <div className="sub-bar">
        <p>Search</p>
      </div>
      <Nav />
    </header>
  );
}

export default Header;
