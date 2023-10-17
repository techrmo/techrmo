import { userSchema } from '../schema/userSchema';

import { api } from './api';

export const getCurrentUser = async () => {
  const response = await api.get('users/me');

  const user = userSchema.parse(response.data);

  return user;
};
