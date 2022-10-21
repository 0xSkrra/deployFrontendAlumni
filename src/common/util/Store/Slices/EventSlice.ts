import { Event } from "../../../interface/Event"
import { Post } from "../../../interface/Post"
export interface EventSlice{
    Events: Event[],
    addEvent: (Events: Event) => void,
    removeEvents: () => void,
    setEvents: (events: Event[]) => void,
    loadingEvents: boolean
    eventsHasErrors: boolean
    fetchEvents: () => void
    addPostToEvent: (post: Post) => void
}