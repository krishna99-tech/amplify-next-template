import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource.js';
import { data } from './data/resource.js';
import { helloWorld } from './functions/hello-world/resource.js';

defineBackend({
  auth,
  data,
  helloWorld,
});
