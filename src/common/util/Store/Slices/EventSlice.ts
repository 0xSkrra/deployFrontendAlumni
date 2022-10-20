import { Event } from "../../../interface/Event"
export interface EventSlice{
    Events: Event[],
    addEvent: (Events: Event) => void,
    removeEvents: () => void,
    loadingEvents: boolean
    eventsHasErrors: boolean
    fetchEvents: () => void
}