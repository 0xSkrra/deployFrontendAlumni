export interface EventSlice{
    Events: Event[],
    setEvents: (Events: Event[]) => void,
    removeEvents: () => void,
}