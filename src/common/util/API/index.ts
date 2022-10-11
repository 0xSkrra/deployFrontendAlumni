import axios from "./api"
import { UserProfile } from "../../interface/UserProfile"

export const getUserProfile = async (): Promise<UserProfile> => {
    const user: UserProfile =  (await axios.get('/api/users/1')).data
    return user
}