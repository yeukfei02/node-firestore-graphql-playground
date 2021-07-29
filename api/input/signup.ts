import { inputObjectType } from 'nexus';

export const Signup = inputObjectType({
  name: 'Signup',
  definition(t) {
    t.nonNull.string('email');
    t.nonNull.string('password');
    t.nonNull.string('name');
  },
});
