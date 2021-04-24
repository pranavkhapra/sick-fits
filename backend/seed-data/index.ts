/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// importing the product from the data file means the file contains data
import { products } from './data';

export async function insertSeedData(ks: any) {
  // Keystone API changed, so we need to check for both versions to get keystone
  const keystone = ks.keystone || ks;
  const adapter = keystone.adapters?.MongooseAdapter || keystone.adapter;
  console.log(`🌱 Inserting Seed Data: ${products.length} Products`);
  // we are grabbing the keystone mongoose adapter
  // and injecting it to the database
  const { mongoose } = adapter;
  // loop over every product
  for (const product of products) {
    console.log(`  🛍️ Adding Product: ${product.name}`);
    const { _id } = await mongoose
      // take the productImage schema
      .model('ProductImage')
      // create the image
      .create({ image: product.photo, altText: product.description });
    product.photo = _id;
    // and create the product for that
    await mongoose.model('Product').create(product);
  }
  console.log(`✅ Seed Data Inserted: ${products.length} Products`);
  console.log('👋 Please start the process with `yarn dev` or `npm run dev`');
  // then we are done exit and start it again
  process.exit();
}
