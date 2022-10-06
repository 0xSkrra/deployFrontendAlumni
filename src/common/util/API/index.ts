import { UserProfile } from "../../interface/UserProfile"

export const getUserProfile = (): UserProfile => {
    const user: UserProfile = {
        id: -1,
        fun_fact: "",
        status: "",
        isAuthenticated: true,
        picture: "",
        bio: ""
    }
    return user
}