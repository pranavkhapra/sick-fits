# Uzumaki Store

Uzumaki Store is a eCommerce website built on a super fresh framework of _Keystone_, _GraphQL_, _React (Next)_, _TypeScript_ and  _Apollo Client_, but even has some other friends like _Ethereal_, _Nodemailer_,  _Stripe_ and _Apollo's React Hooks_.

Totally functional, fluid animations, and a clean design, so feel free to peruse the site and pick something up to freshen up your wardrobe with that weeb energy.

I don't think I need to say it, but this guy is just a demo running a Stripe Testing environment. You don't actually have to put your real credit card in, but you're welcome to try I guess 😂.

## Using the app

You've been to other online merchants haven't you?! Just browse around the multitude of clothes until you find something you fancy. After that, you should probably make an account so you can actually buy something.

With an account set up, you'll have access to the bulk of the application, including the ability to sell your own products (and manage them), view your profile, add items to your cart, checkout/purchase those items, and review past orders as well! 

## How it Works

It is built on a **Prisma** backend that's been deployed to Heroku, since they have an awesome integration set up. Another **GraphQL-Yoga** server sits on top of the backend, and acts as the proxy for the database manipulations, and also sits on Heroku!

For the Frontend, it was built entirely in the _React_ framework **Next** for the quick loading, SSR, and Router, **Context** for state-management but also uses **Apollo's React Hooks** for interfacing with Apollo Client .....for GraphQL/caching. 

**Apollo Client** for Data Management (performing GraphQL Mutations(create, update, delete) ,Queries for Fetching data,
Caching GraphQL Data , Error and Loading UI States
__Apollo Client replaces the need for redux + data fetching/caching libraries__
 
For the Backend Keystone.js(A Node.js based GraphQL Server + Headless CMS) for -- building interface for admin to manage data , schema's,data relationships ,provides a set fo graphql crud api's for a mongodb database , implementing query and mutation resolvers ,charging credit cards with Stripe(Credit card checkout is also handled completely through **Stripe**, that way I don't have to touch any credit card details in the app 😁😁.),sending email
,performing authentication, lastly the most confusing thing ...managing + checking roles + permissions.

