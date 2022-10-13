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
    target?: Topic | Group | Event | UserProfile, //trenger kun inkludere typen event dersom users skal kunne skrive posts/kommentarer i et event
}