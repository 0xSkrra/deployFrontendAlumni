import { Event } from "./Event";
import { Post } from "./Post";
import { UserProfile } from "./UserProfile";


export interface Topic {
    id: number,
    title: string,
    body: string,
    posts: Post[],//IPost[]|null,
    users: UserProfile[],//IUser[]|null,
    events: Event[],//IEvent[]|null,
};

export const placeholderTopic = {
    id: -1,
    title: '',
    body: '',
    posts: [],
    users: [],
    events: []
}