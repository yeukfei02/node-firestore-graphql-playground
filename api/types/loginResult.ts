import { objectType, nonNull } from 'nexus';

export const LoginResult = objectType({
  name: 'LoginResult',
  definition(t) {
    t.field('message', {
      type: nonNull('String'),
    });
    t.field('token', {
      type: nonNull('String'),
    });
    t.nonNull.string('userId');
  },
});
