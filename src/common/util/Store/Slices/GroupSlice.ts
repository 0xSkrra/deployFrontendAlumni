import { Group } from "../../../interface/Group";
import { Post } from "../../../interface/Post";

export interface GroupSlice{
    Groups: Group[],
    loadingGroups: boolean,
    groupsHasErrors: boolean,
    addGroup: (group: Group) => void,
    addPostToGroup: (post: Post) => void,
    removeGroups: () => void,
    fetchGroups: () => void
    
}