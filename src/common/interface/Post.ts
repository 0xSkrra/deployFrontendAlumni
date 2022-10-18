import { Group } from "./Group";
import { Topic } from "./Topic";
import { UserProfile } from "./UserProfile";

export interface Post {
    id: number,
    title: string,
    body: string,
    lastUpdated: string,
    author?: UserProfile,
    parentId?: Post,
    replies?: Post[]
    recieverId?: number,
    topicId?: number,
    groupId?: number,
    eventId?: number,
}