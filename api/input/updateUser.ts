import { inputObjectType } from 'nexus';

export const UpdateUser = inputObjectType({
  name: 'UpdateUser',
  definition(t) {
    t.nonNull.string('email');
    t.nonNull.string('password');
    t.nonNull.string('name');
  },
});
