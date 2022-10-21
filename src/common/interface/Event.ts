import { Group } from "./Group"
import { Post } from "./Post"
import { Topic } from "./Topic"
import { defaultUserProfile, UserProfile } from "./UserProfile"

export interface Event{
    id: number,
    name: string,
    description: string,
    lastUpdated: string,
    startTime: string,
    endTime: string,
    allowGuests: boolean
    usersAccepted?: UserProfile[],
    author: UserProfile,
    authorId: number,
    topics: Topic[],
    Groups: Group[],
    usersInvited: UserProfile[],
    usersResponded: UserProfile[],
    posts: Post[],
}

export const placeholderEvent = {
    id: -1,
    name: '',
    description: '',
    lastUpdated: '',
    startTime: '',
    endTime: '',
    allowGuests: true,
    usersAccepted: [],
    author: defaultUserProfile,
    authorId: -1,
    topics: [],
    Groups: [],
    usersInvited: [],
    usersResponded: [],
    posts: []
    
}