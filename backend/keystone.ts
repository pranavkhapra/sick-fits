/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { createAuth } from '@keystone-next/auth';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';

const databaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-uzumaki-store';

// bascially we will create ths session config for the authentication and all of for the frontend
// authenticate front end of the application we will create session
// create a cookie in browser that have jwt
const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // how long 360 days they should stay sign in
  secret: process.env.COOKIE_SECRET,
};
const { withAuth } = createAuth({
  // it needs to be know that which schema is responsible for user can be customer or compnay and in our case user and their identify the person email or username

  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  // init first item if these are not there create them and them auth
  initFirstItem: {
    fields: ['name', 'email', 'password'],
  },
  // Todo:Add inn initial role and all
});
// we just put the with auth around the config
export default withAuth(
  config({
    // cors will bascially helps like we are running backend on a diff port than frontend we need to allow to data got to  backend to frontend
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        // it will pass the cookie
        credentials: true,
      },
    },
    db: {
      // database adapter knex or mongoose mongoose for mongo and other for postgres
      adapter: 'mongoose',
      // the database url
      url: databaseURL,
      // Todo :Add data seeding here
    },
    // the data types and all basically the user and the other schema
    lists: createSchema({
      // Schema items go in here
      User,
      Product,
      ProductImage,
    }),
    // the roles and all of the ui of the keystone dashboard sometimes you dont want to show them
    ui: {
      // todo: change this for roles
      // we want to show the ui who pass this test
      //   isAccessAllowed: () => true,
      isAccessAllowed: ({ session }) => {
        console.log(session);
        // if there is session and there is data it would return true

        return !!session?.data;
      },
    },
    // todo add session values here
    // bascially we just created a with auth so there would be cookie passed as a person is logged in so
    // send a cookie and give a session to the person
    session: withItemData(statelessSessions(sessionConfig), {
      // graphql query
      // help so much in middle ware check user info and all
      User: 'id name email',
    }),
  })
);
