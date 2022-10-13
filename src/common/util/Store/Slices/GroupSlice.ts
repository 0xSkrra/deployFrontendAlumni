import { Group } from "../../../interface/Group";

export interface GroupSlice{
    Groups: Group[],
    setGroups: (Groups: Group[]) => void,
    removeGroups: () => void,
}