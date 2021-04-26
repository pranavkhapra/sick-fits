/* eslint-disable react/prop-types */
// basically the thing i do here is the next js thing when having same strucuture
// and then it will say use this template whenver this is the case
// we will get a query param to get id and look up the product

import SingleProduct from '../../components/SingleProduct';

export default function SingleProductPage({ query }) {
  return <SingleProduct id={query.id} />;
}
