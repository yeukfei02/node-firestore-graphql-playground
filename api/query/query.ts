import { queryField, list, nonNull, idArg } from 'nexus';
import { User } from '../types/user';
import { usersControllerFunc, userControllerFunc } from '../../src/controller/users';

export const users = queryField('users', {
  type: nonNull(list(nonNull(User))),
  resolve: usersControllerFunc,
});

export const user = queryField('user', {
  type: nonNull(User),
  args: { id: nonNull(idArg()) },
  resolve: userControllerFunc,
});
