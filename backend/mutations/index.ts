import { graphQLSchemaExtension } from '@keystone-next/keystone/schema';
import addToCart from './addToCart';
import checkout from './checkout';

// make a fake graphql tagged template literal
const graphql = String.raw;

// typeDefs is the name of the mehod the argument and all
export const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: graphql`
    type Mutation {
      # //basically we are creating a mutation that takes a mutation that is addToCart takes in a product id and then basically return the cart item
      addToCart(productId: ID): CartItem
      # return from that will be order
      checkout(token: String!): Order
    }
  `,
  // the node file that have function that are requested  via gql api
  // basically the functionality of how to add to the items and all
  resolvers: {
    Mutation: {
      addToCart,
      checkout,
    },
  },
});
