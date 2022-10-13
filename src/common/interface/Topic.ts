import { Post } from "./Post";


export interface Topic {
    name: string,
    description: string,
    posts?: Post[],
};