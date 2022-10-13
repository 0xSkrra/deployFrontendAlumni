import { Post } from "../../../interface/Post";


export interface PostSlice{
    Posts: Post[],
    setPosts: (Posts: Post[]) => void,
    removePost: () => void,
}