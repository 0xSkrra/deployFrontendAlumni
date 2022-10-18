import { Group } from "../../../interface/Group";

export interface GroupSlice{
    Groups: Group[],
    addGroup: (Groups: Group) => void,
    removeGroups: () => void,
}