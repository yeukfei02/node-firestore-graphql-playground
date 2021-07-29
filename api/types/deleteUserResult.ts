import { objectType, nonNull } from 'nexus';

export const DeleteUserResult = objectType({
  name: 'DeleteUserResult',
  definition(t) {
    t.field('message', {
      type: nonNull('String'),
    });
  },
});
