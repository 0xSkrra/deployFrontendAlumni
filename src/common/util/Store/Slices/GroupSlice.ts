import { Group } from "../../../interface/Group";

export interface GroupSlice{
    Groups: Group[],
    loadingGroups: boolean,
    groupsHasErrors: boolean,
    addGroup: (Groups: Group) => void,
    removeGroups: () => void,
    fetchGroups: () => void
    
}