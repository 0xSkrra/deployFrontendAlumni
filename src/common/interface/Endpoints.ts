
export interface IGroup {
    id: number,
    title: string,
    body: string|null,
    isPrivate: boolean,
    posts: IPost[]|null,
    users: IUser[]|null,
    events: IEvent[]|null,
};

export interface ITopic {
    id: number,
    title: string,
    body: string,
    isPrivate: boolean,
    posts: [],//IPost[]|null,
    users: [],//IUser[]|null,
    events: [],//IEvent[]|null,
}

export interface IEvent {
    id: number,
    name: string,
    description: string|null,
    lastUpdated: Date,
    startTime: Date,
    endTime: Date,
    allowGuests: boolean,
    usersResponded:IUser[]|null,
    topics:ITopic[]|null, //topic list?
    groups:IGroup[]|null,
    posts:IPost[]|null
    authorId: number,
    author: string,
}

export interface IUser {
    id:number,
    keycloakId:string|null,
    username:string,
    status:string,
    bio:string|null,
    funFact:string|null,
    picture:string|null,
    authoredPosts:IPost[]|null,
    receivedPosts:IPost[]|null,
    auhoredEvents:IEvent[]|null,
    topics:ITopic[]|null,
    groups:IGroup[]|null,
    respondedEvents:IEvent[]|null,
}

export interface IPost {
    id:number,
    title:string,
    body:string|null,
    authorId:number
}