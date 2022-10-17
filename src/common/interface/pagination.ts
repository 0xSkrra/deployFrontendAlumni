import { Post } from "./Post"

export interface PaginationResponseObject{
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
    ElementCount: -1,
    PageCount: -1,
    HasPrevious: false,
    HasNext: false
}