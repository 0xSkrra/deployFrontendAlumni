export interface UserProfile{
    id: number,
    status: string,
    bio: string,
    fun_fact: string,
    picture: string,
    isAuthenticated: boolean
}

export const defaultUserProfile: UserProfile = {
    id: -1,
    status: "",
    bio: "",
    fun_fact: "",
    picture: "",
    isAuthenticated: false
}