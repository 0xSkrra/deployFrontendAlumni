import { UserProfile } from "../../../interface/UserProfile";

export interface UserSlice{
    User: UserProfile,
    setUser: (user: UserProfile) => void,
    removeUser: () => void,
}