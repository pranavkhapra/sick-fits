import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';

const databaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-uzumaki-store';

// bascially we will create ths session config for the authentication and all of for the frontend
// authenticate front end of the application we will create session
// create a cookie in browser that have jwt
const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // how long 360 days they should stay sign in
  secret: process.env.COOKIE_SECRET,
};

export default config({
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
  // the data types and all
  lists: createSchema({
    // Schema items go in here
  }),
  // the roles and all of the ui of the keystone dashboard sometimes you dont want to show them
  ui: {
    // todo: change this for roles
    isAccessAllowed: () => true,
  },
  // todo add session values here
});
