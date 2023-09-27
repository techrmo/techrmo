import { api } from '@/shared/services/api';


export const signOut = async () => {
    await api.post('signOut');
};
