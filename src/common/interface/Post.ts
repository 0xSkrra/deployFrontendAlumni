import { Group } from "./Group";
import { Topic } from "./Topic";
import { UserProfile } from "./UserProfile";

export interface Post {
    title: string,
    body: string,
    author: string,
    parent?: Post,
    target: Topic | Group | Event | UserProfile, //trenger kun inkludere typen event dersom users skal kunne skrive posts/kommentarer i et event
};