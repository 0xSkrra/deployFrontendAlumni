import { UserProfile } from "./UserProfile";

export interface userState{
    User: UserProfile,
    setUser: (user: UserProfile) => void,
    removeUser: () => void,
}