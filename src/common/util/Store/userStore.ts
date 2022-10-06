import create from "zustand";
import {persist} from "zustand/middleware"
import { defaultUserProfile, UserProfile } from "../../interface/UserProfile";
import { userState } from "../../interface/userState";


export const useUserStore = create<userState, [["zustand/persist", userState]]>(
    persist(
      (set, get) => ({
        User: defaultUserProfile,
        setUser: (newUser: UserProfile) => set(() => ({ User: newUser })),
        removeUser: () => set(() => ({ User: defaultUserProfile })),
      }),
      {
        name: 'user-storage', // unique name
        getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
      }
    )
  )