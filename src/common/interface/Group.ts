export interface Group {
    id: number,
    title: string,
    body: string|null,
    isPrivate: boolean,
    posts?: [],
    users?: [],
    events?: [],
};