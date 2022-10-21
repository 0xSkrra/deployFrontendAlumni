import { Event } from "./Event";
import { Post } from "./Post";
import { UserProfile } from "./UserProfile";

export interface Group {
    id: number,
    title: string,
    body: string|null,
    isPrivate: boolean,
    posts: Post[],
    users: UserProfile[],
    events: Event[],
};

export const placeholderGroup = {
    id: -1,
    title: '',
    body: '',
    isPrivate: false,
    posts: [],
    users: [],
    events: []
}