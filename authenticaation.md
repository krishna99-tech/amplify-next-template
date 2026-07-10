# Authentication Root Function

In AWS Amplify Gen 2, the authentication root function provided is `defineAuth()`. 

It is imported from `@aws-amplify/backend` and is used to define and configure your backend authentication resource, which is powered by Amazon Cognito.

## Usage in this Project

You can find this function used in the `amplify/auth/resource.ts` file:

```typescript
import { defineAuth } from "@aws-amplify/backend";

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
});
```

This configuration sets up a Cognito User Pool that allows users to sign in with their email address.

This `auth` definition is then exported and registered as a backend resource in `amplify/backend.ts`:

```typescript
import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource.js';
// ...

defineBackend({
  auth,
  // ...
});
```
