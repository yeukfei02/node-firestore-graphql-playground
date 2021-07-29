import { inputObjectType } from 'nexus';

export const Login = inputObjectType({
  name: 'Login',
  definition(t) {
    t.nonNull.string('email');
    t.nonNull.string('password');
  },
});
