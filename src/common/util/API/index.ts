import axios from "./api"
import { UserProfile, UserProfilePatch } from "../../interface/UserProfile"
import { Post } from "../../interface/Post"
import { Topic } from "../../interface/Topic"
import { Group } from "../../interface/Group"
import { PaginationResponseObject } from "../../interface/pagination"


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

export const getAllPosts = async (page:number, itemsPerPage: number): Promise<PaginationResponseObject> => {
    const posts  = (await axios.get(`/api/posts?Page=${page}&ItemsPerPage=${itemsPerPage}`))
    return posts.data
}

export const addCommentToPost = async (postId: number, comment: string): Promise<Post> => {
    const postData = {
        body: comment,
        parentId: postId
    }
    const post: Post = (await axios.post('/api/posts', postData)).data
    return post
}
export const getUserTopics = async (): Promise<Topic[]> => {
    return (await axios.get(`/api/Topics`)).data
}

export const getUserGroups = async (): Promise<Group[]> => {
    return (await axios.get(`/api/Groups`)).data
}

export const addTopicMember = async (topicId: number): Promise<any> => {

    return (await axios.put(`api/Topics/${topicId}/Join`).then(r => r.status))
}

export const addGroupMember = async (groupId: number): Promise<any> => {    
    const req = (await axios.put(`api/Groups/${groupId}/Join`).then(r => r.status))
    return req
}

export const leaveGroup = async (groupId: number): Promise<any> => {

    return (await axios.delete(`api/Groups/${groupId}/Leave`).then(r => r.status))
}

export const leaveTopic = async (topicId: number): Promise<any> => {

    return (await axios.delete(`api/Topics/${topicId}/Leave`).then(r => r.status))
}
