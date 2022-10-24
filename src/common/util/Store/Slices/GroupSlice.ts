import { Group } from "../../../interface/Group";
import { Post } from "../../../interface/Post";
import { Event } from "../../../interface/Event";
export interface GroupSlice{
    Groups: Group[],
    loadingGroups: boolean,
    groupsHasErrors: boolean,
    addGroup: (group: Group) => void,
    addPostToGroup: (post: Post) => void,
    addEventToGroup: (event: Event, groupId: number) => void,
    removeGroups: () => void,
    fetchGroups: () => void
    
}