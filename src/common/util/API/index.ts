import axios from "./api"
import { UserProfile, UserProfilePatch } from "../../interface/UserProfile"
import { Post } from "../../interface/Post"
import { Topic } from "../../interface/Topic"
import { Group } from "../../interface/Group"


export const getOrCreateUserProfile = async (): Promise<UserProfile> => {
    const userData: UserProfile = (await axios.get(`/api/users`)
    .then(res => res)
    .catch(async err => 
        (await axios.post("/api/users"))
        ))
        .data

    return userData
}

export const updateUserProfile = async (user: UserProfile): Promise<number> => {
    const userToPatch: UserProfilePatch = {
        id: user.id,
        status: user.status,
        bio: user.bio,
        funFact: user.funFact,
        picture: user.picture
    }
    const status = (await axios.patch(`/api/users/${user.id}`, userToPatch)).status
    return status
}

export const getUserById = async (id: number): Promise<UserProfile> => {
    const user: UserProfile = (await axios.get(`/api/users/${id}`)).data
    return user
}

export const getAllPosts = async (): Promise<Post[]> => {
    const posts: Post[] = (await axios.get('/api/posts')).data
    return posts

}

export const getUserTopics = async (): Promise<Topic[]> => {
    return (await axios.get(`/api/Topics`)).data
}

export const getUserGroups = async (): Promise<Group[]> => {
    return (await axios.get(`/api/Groups`)).data
}