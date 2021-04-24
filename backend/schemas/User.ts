import { list } from '@keystone-next/keystone/schema';
import { text, password, relationship } from '@keystone-next/fields';

// named export not export default name export is {}
export const User = list({
  // access:
  // that..... should they be able to see keystone ui or not
  // ui
  fields: {
    name: text({
      isRequired: true,
    }),
    email: text({
      isRequired: true,
      isUnique: true,
    }),
    password: password(),
    // todo roles cart and orders of the user
  },
});
