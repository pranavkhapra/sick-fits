import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import useForm from '../lib/useForm';
import DisplayError from './DisplayError';
import Form from './styles/Form';
import { ALL_PRODUCTS_QUERY } from './Products';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    #which variables are getting passed and what are its type and all
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        # //the photo is basically a diff type or field in our backend productImage
        # so we basically just create a relationship and also create a item or image behind the scene and then we will return the thing in down
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      price
      description
      name
    }
  }
`;
export default function CreateProduct() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    image: '',
    name: 'Nice Shoes',
    price: 123,
    description: 'these are the best shoes',
  });
  // like in the useQuery we get back data loading error here we get a extra function to createproduct
  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      // anyadditioanl data we need to come along we need to have the variable
      // because whole inputs are our variable
      variables: inputs,
      // for the update of the query when mutation happen
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );

  return (
    <Form
      onSubmit={async (event) => {
        event.preventDefault();
        // submit the input field to the backend
        const response = await createProduct();
        // when it is created clear the form
        clearForm();
        // then we need to go to the product page becausee its sickkkkkkkkkkkkkkkkk
        // Like when you change the page and all i want to basically
        // take the user to the product created page so we use here a
        //  Programmatically Changing the Page thing not like declarative used in header and all so
        // when onSubmit after getting response clearing form we will use this
        Router.push({
          pathname: `/product/${response.data.createProduct.id}`,
        });
      }}
    >
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          Image
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Add Product</button>
      </fieldset>
    </Form>
  );
}
