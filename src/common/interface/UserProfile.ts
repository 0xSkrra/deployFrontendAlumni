export interface UserProfile{
    id: number,
    username: string,
    status: string,
    bio: string,
    funFact: string,
    picture: string,
    isAuthenticated: boolean
    authoredPosts: [];
    recievedPosts: [];
    authoredEvents: [];
    topics: [];
    groups: [];
    respondedEvents: [];
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