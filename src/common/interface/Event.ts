import { Group } from "./Group"
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
    topics?: Topic[],
    groups?: Group[]
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
    topics: [],
    groups: []
}