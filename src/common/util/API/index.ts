import axios from "./api"
import { UserProfile } from "../../interface/UserProfile"

export const getUserProfile = async (): Promise<UserProfile> => {
    const user: UserProfile =  (await axios.get('/api/users/1')).data
    return user
}

export const updateUserProfile = async (user: UserProfile): Promise<UserProfile> => {
    const patchedUser: UserProfile = (await axios.patch(`/api/users/${user.id}`, user)).data
    return patchedUser
}

export const getUserById = async (id: number): Promise<UserProfile> => {
    const user: UserProfile = (await axios.get(`/api/users/${id}`)).data
    return user
}