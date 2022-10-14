import { Post } from "./Post";


export interface Topic {
    id: number,
    title: string,
    body: string,
    isPrivate: boolean,
    posts: [],//IPost[]|null,
    users: [],//IUser[]|null,
    events: [],//IEvent[]|null,
};