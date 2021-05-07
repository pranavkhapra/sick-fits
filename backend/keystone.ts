/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { createAuth } from '@keystone-next/auth';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import { extendGraphqlSchema } from './mutations';

import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { insertSeedData } from './seed-data';
import { sendPasswordResetEmail } from './lib/mail';
import { CartItem } from './schemas/CartItem';
import { OrderItem } from './schemas/OrderItem';
import { Order } from './schemas/Order';
import { Role } from './schemas/Role';
import { permissionsList } from './schemas/fields';

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
  // this wil create a new mutation in the keystone to reset password bascially send token  for now
  passwordResetLink: {
    async sendToken(args) {
      // only create the token which we want to reset the password
      // console.log(args);
      // args,identity is basically who is going you send it to
      await sendPasswordResetEmail(args.token, args.identity);
    },
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
    // database connection
    db: {
      // database adapter knex or mongoose mongoose for mongo and other for postgres
      adapter: 'mongoose',
      // the database url
      url: databaseURL,
      // Todo :Add data seeding here data seeding means the data i have created in the seed-data the fake data of all images and all
      // enttire keystone value and all
      async onConnect(keystone) {
        console.log('connected to the database');
        // only when a person passes a argument to keystone when the run it
        if (process.argv.includes('--seed-data')) {
          // the seed data function that basically seed all the data
          await insertSeedData(keystone);
        }
      },
    },
    // the data types and all basically the user and the other schema
    lists: createSchema({
      // Schema items go in here
      User,
      Product,
      ProductImage,
      CartItem,
      OrderItem,
      Order,
      Role,
    }),

    // the custom mutation for the add to cart
    extendGraphqlSchema,
    // the roles and all of the ui of the keystone dashboard sometimes you dont want to show them
    ui: {
      // todo: change this for roles
      // we want to show the ui who pass this test
      //   isAccessAllowed: () => true,
      isAccessAllowed: ({ session }) =>
        // eslint-disable-next-line prettier/prettier
      // console.log(session);
        // the user name and all the info if  there is session and there is data it would return true

        !!session?.data,
    },
    // todo add session values here
    // bascially we just created a with auth so there would be cookie passed as a person is logged in so
    // send a cookie and give a session to the person
    session: withItemData(statelessSessions(sessionConfig), {
      // graphql query
      // help so much in middle ware check user info and all
      // we know the  session has some type of info about the currently logged in user and keystone has access to session to change the item update and keystone look after it to do those things
      // so now in every single session we have query id name email and it uses it addToCart mutation and all
      // so now we also want to pass the role of the user so that other query and mutation can take them  and use them as we have used name email id
      // you can't acces everything in graphql so we have just did something in the fields.ts to get all
      // while doing this we can run all the query in array in the grapqhl or the api explorer
      User: `id name email role { ${permissionsList.join(' ')} }`,
    }),
  })
);
