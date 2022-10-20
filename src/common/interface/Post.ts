import { UserProfile } from "./UserProfile";

export interface Post {
    id: number,
    title: string,
    body: string,
    lastUpdated: string,
    author?: UserProfile,
    parentId?: Post,
    replies?: Post[]
    receiverId?: number,
    topicId?: number,
    groupId?: number,
    eventId?: number,
}