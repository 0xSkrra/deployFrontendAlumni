import axios from "./api"
import { UserProfile, UserProfilePatch } from "../../interface/UserProfile"
import { Post } from "../../interface/Post"
import { Topic } from "../../interface/Topic"
import { Group } from "../../interface/Group"
import { PostPaginationResponse } from "../../interface/pagination"


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

export const getAllPosts = async (page:number, itemsPerPage: number): Promise<PostPaginationResponse> => {
    const posts  = (await axios.get(`/api/posts?Page=${page}&ItemsPerPage=${itemsPerPage}`))
    return posts.data
}
export const getAllPostsForTopic= async (topicId: number, page:number, itemsPerPage: number): Promise<PostPaginationResponse> => {
    const posts  = (await axios.get(`/api/posts/topic/${topicId}?Page=${page}&ItemsPerPage=${itemsPerPage}`))
    return posts.data
}

export const getGroupPosts = async (groupId: number, page:number, itemsPerPage: number): Promise<PostPaginationResponse> => {
    const posts  = (await axios.get(`/api/posts/group/${groupId}?Page=${page}&ItemsPerPage=${itemsPerPage}`))
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

export const getTopicById = async (id:number): Promise<Topic> => {
    const topic = (await axios.get(`/api/Topics/${id}`))
    return topic.data
}


export const addGroup = async (title: string, description: string, isPrivate: boolean): Promise<Group> => {
    const groupData = {
        title: title,
        body: description,
        isPrivate: isPrivate
    }
    const group: Group = (await axios.post('/api/groups', groupData)).data
    return group
}

export const addTopic = async (title: string, description: string): Promise<Topic> => {
    const topicData = {
        title: title,
        body: description,
    }
    const topic: Topic = (await axios.post('/api/topics', topicData)).data
    return topic
}

// Fix pls
export const addPost = async (title: string, description: string): Promise<Post> => {
    const postData = {
        title: title,
        body: description,
    }
    const post: Post = (await axios.post('/api/posts', postData)).data
    return post
}


export const addTopicMember = async (topicId: number): Promise<any> => {

    return (await axios.post(`api/Topics/${topicId}/join`))
}

export const addGroupMember = async (groupId: number): Promise<any> => {    
    return (await axios.post(`api/Groups/${groupId}/Join`))
}

export const leaveGroup = async (groupId: number): Promise<any> => {

    return (await axios.delete(`api/Groups/${groupId}/Leave`))
}

export const leaveTopic = async (topicId: number): Promise<any> => {

    return (await axios.delete(`api/Topics/${topicId}/Leave`))
}
