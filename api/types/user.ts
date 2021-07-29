import { objectType, nonNull } from 'nexus';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.field('id', {
      type: nonNull('ID'),
    });
    t.field('email', {
      type: nonNull('String'),
    });
    t.field('password', {
      type: nonNull('String'),
    });
    t.field('name', {
      type: nonNull('String'),
    });
    t.field('createdAt', {
      type: nonNull('String'),
    });
    t.field('updatedAt', {
      type: nonNull('String'),
    });
  },
});
