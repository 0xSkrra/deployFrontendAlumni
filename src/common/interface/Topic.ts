import { Event } from "./Event";
import { Post } from "./Post";
import { UserProfile } from "./UserProfile";


export interface Topic {
    id: number,
    title: string,
    body: string,
    posts: Post[],
    users: UserProfile[],
    events: Event[],
};

export const placeholderTopic = {
    id: -1,
    title: '',
    body: '',
    posts: [],
    users: [],
    events: []
}