import axios from 'axios';

import { githubUserSchema } from './validators/githubUser';

export const getUserByUid = async (uid: string | undefined) => {
  if (!uid) {
    return;
  }

  try {
    const response = await axios.get(`https://api.github.com/user/${uid}`);

    const data = githubUserSchema.parse(response.data);

    return data;
  } catch (error) {
    console.error(error);
  }
};
