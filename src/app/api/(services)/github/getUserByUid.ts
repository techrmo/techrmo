import { githubUserSchema } from './validators/githubUser';
import { githubApi } from './githubApi';

export const getUserByUid = async (uid: string | undefined) => {
  if (!uid) {
    return;
  }

  try {
    const response = await githubApi.get(`/user/${uid}`);

    const data = githubUserSchema.parse(response.data);

    return data;
  } catch (error) {
    console.error(error);
  }
};
