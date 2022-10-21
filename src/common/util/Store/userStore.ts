import create from "zustand";
import {devtools, persist} from "zustand/middleware"
import { Post } from "../../interface/Post";
import { defaultUserProfile, UserProfile } from "../../interface/UserProfile";
import { UserSlice } from "./Slices/UserSlice";


export const useUserStore = create<UserSlice>()(
  devtools(  
  persist(
      (set) => ({
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
)