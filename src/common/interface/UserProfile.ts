export interface UserProfile{
    id: number,
    status: string,
    bio: string,
    fun_fact: string,
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
    status: "",
    bio: "",
    fun_fact: "",
    picture: "",
    isAuthenticated: false,
    authoredPosts: [],
    recievedPosts: [],
    authoredEvents: [],
    topics: [],
    groups: [],
    respondedEvents: [],
}