import { objectType, nonNull } from 'nexus';

export const SignupResult = objectType({
  name: 'SignupResult',
  definition(t) {
    t.field('message', {
      type: nonNull('String'),
    });
  },
});
