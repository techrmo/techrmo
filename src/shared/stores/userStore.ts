import { create } from 'zustand';

export interface User {
  uid: string;
  name: string;
  email: string;
  profileImage: string;
}

interface State {
  user: User | null;
  isLoading: boolean;
}

interface Actions {
  setUser: (user: User | null) => void;
  setIsloading: (isLoading: boolean) => void;
}

interface UserStore extends State, Actions {}

const initialState: State = {
  user: null,
  isLoading: false,
};

export const useUserStore = create<UserStore>((set) => ({
  ...initialState,
  setUser: (user) => set({ user }),
  setIsloading: (isLoading: boolean) => set({ isLoading }),
}));
