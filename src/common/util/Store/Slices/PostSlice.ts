import { Group } from "../../../interface/Group";
import { Post } from "../../../interface/Post";
import { Topic } from "../../../interface/Topic";
import { UserProfile } from "../../../interface/UserProfile";


export interface PostSlice{
    Posts: Post[],
    addPost: (Post: Post) => void,
    removePosts: () => void,
    getGroup: (id: number) => Group,
    getEvent: () => Event,
    getTopic: () => Topic,
    getReceiver: () => UserProfile,
}