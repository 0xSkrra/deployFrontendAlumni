import { Group } from "../../../interface/Group";

export interface GroupSlice{
    Groups: Group[],
    loading: boolean,
    hasErrors: boolean,
    addGroup: (Groups: Group) => void,
    removeGroups: () => void,
    fetch: () => void
    
}