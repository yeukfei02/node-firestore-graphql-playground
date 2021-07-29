import { objectType, nonNull } from 'nexus';

export const UpdateUserResult = objectType({
  name: 'UpdateUserResult',
  definition(t) {
    t.field('message', {
      type: nonNull('String'),
    });
  },
});
