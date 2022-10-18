export interface EventSlice{
    Events: Event[],
    addEvent: (Events: Event) => void,
    removeEvents: () => void,
    loading: boolean
    hasErrors: boolean
    fetch: () => void
}