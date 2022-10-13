import { Group } from "./Group";
import { Post } from "./Post";
import { Topic } from "./Topic";

export interface UserProfile{
    id: number,
    username: string,
    status: string,
    bio: string,
    funFact: string,
    picture: string,
    isAuthenticated: boolean
    authoredPosts: Post[];
    recievedPosts: Post[];
    authoredEvents: Event[];
    topics: Topic[];
    groups: Group[];
    respondedEvents: Event[];
}

export interface UserProfilePatch{
    id: number,
    status: string,
    bio: string,
    funFact: string,
    picture: string
}

export const defaultUserProfile: UserProfile = {
    id: -1,
    username: "",
    status: "",
    bio: "",
    funFact: "",
    picture: "",
    isAuthenticated: false,
    authoredPosts: [],
    recievedPosts: [],
    authoredEvents: [],
    topics: [],
    groups: [],
    respondedEvents: [],
}