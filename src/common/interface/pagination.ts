import { Group } from "./Group"
import { Post } from "./Post"
import { Topic } from "./Topic"

export interface PostPaginationResponse{
    pagination: Paginate
    data: Post[]
}
export interface Paginate{
    CurrentPage: number,
    ElementCount: number,
    PageCount: number,
    HasPrevious: boolean,
    HasNext: boolean
}
export const defaultPaginate: Paginate = {
    CurrentPage: 1,
    ElementCount: 0,
    PageCount: 0,
    HasPrevious: false,
    HasNext: false
}