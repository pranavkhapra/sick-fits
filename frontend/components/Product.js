/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import Link from 'next/link';
import formatMoney from '../lib/formatMoney';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import DeleteProduct from './DeleteProduct';

export default function Product({ product }) {
  return (
    <ItemStyles>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product.name}
      />

      <Title>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </Title>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>
        {`${product.description.substring(0, 40)}...`}
        <Link href={`/product/${product.id}`}>Read more</Link>
        {/* {product.description} */}
      </p>
      {/* todo add the button */}
      {/* when we basically create the 
      whole new product we takke our user there but what if we want to do it with query and all  */}
      {/* that we pass so we will do this */}
      {/* //the pathname is the update which is the page file and the query is the product.id wait for difference and all */}
      {/* http://localhost:7777/update?id=60840876d9a88eb373961bc3 i think now you understand  */}
      <div className="buttonList">
        <Link
          href={{
            pathname: 'update',
            query: {
              id: product.id,
            },
          }}
        >
          Edit 📝
        </Link>
        <DeleteProduct id={product.id}>Delete 🚮</DeleteProduct>
      </div>
    </ItemStyles>
  );
}
