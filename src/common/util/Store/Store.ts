import create, { StateCreator } from "zustand";
import {devtools, persist} from "zustand/middleware"
import { Event } from "../../interface/Event";
import { Group } from "../../interface/Group";
import { Post } from "../../interface/Post";
import { Topic } from "../../interface/Topic";
import { getUserEvents, getUserGroups, getUserTopics } from "../API";
import { EventSlice } from "./Slices/EventSlice";
import { GroupSlice } from "./Slices/GroupSlice";
import { TopicSlice } from "./Slices/TopicSlice";


const createTopicSlice: StateCreator<
  TopicSlice & GroupSlice  & EventSlice,
  [["zustand/devtools", never],["zustand/persist", unknown]],
  [],
  TopicSlice
> = (set) => ({
  Topics: [],
  loadingTopics: false,
  topicsHasErrors: false,
  addTopic: (newTopic: Topic) => set((state) => ({ Topics: [...state.Topics, newTopic] })),
  removeTopics: () => set(() => ({ Topics: [] })),
  // add post to topic
  addPostToTopic: (postToAdd: Post) => {
    set((state) => ({
      Topics: state.Topics.map((topic) => topic.id === postToAdd.topicId ? ({...topic, posts: [...topic.posts, postToAdd]}) : topic)
    }))
  },
  addEventToTopic: (eventToAdd: Event, topicId: number) => {
    set((state) => ({
      Topics: state.Topics.map((topic) => topicId === topic.id ? ({...topic, events: [...topic.events, eventToAdd]}) : topic)  
      }))
  },
  fetchTopics: async () =>{
    set(() => ({ loadingTopics: false }))
    try{
      const response = (await getUserTopics())
      set(() => ({ Topics: response, loadingTopics: false}))
    }
    catch(err){
      set(() => ({loadingTopics: false}))
    }
  }
})

const createGroupSlice: StateCreator<
  GroupSlice & TopicSlice & EventSlice,
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  [],
  GroupSlice
> = (set) => ({
  Groups: [],
  loadingGroups: false,
  groupsHasErrors: false,
  addGroup: (newGroup: Group) => set((state) => ({ Groups: [...state.Groups, newGroup] })),
  removeGroups: () => set(() => ({ Groups: [] })),
  addPostToGroup: (post: Post) => {
    set((state) => ({
      Groups: state.Groups.map((group) => group.id === post.topicId ? ({...group, posts: [...group.posts, post]}) : group)
    }))
  },
  addEventToGroup: (eventToAdd: Event, topicId: number) => {
    set((state) => ({
      Groups: state.Groups.map((group) => topicId === group.id ? ({...group, events: [...group.events, eventToAdd]}) : group)
    }))
  },
  fetchGroups: async () =>{
    set(() => ({ loadingGroups: false }))
    try{
      const response = (await getUserGroups())
      set(() => ({ Groups: response, loadingGroups: false}))

    }
    catch(err){
      console.log(err)
      set(() => ({loadingGroups: false}))
    }
  }
  
})

const createEventSlice: StateCreator<
 EventSlice & GroupSlice & TopicSlice,
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  [],
  EventSlice
> = (set) => ({
  Events: [],
  loadingEvents: false,
  eventsHasErrors: false,
  addEvent: (newEvent: Event) => set((state) => ({ Events: [...state.Events, newEvent] })),
  addPostToEvent: (post: Post) => {
    set((state) => ({
      Events: state.Events.map((event) => event.id === post.eventId ? ({...event, posts: [...event.posts, post]}) : event)
    }))
  },
  removeEvents: () => set(() => ({ Events: [] })),
  setEvents: (events: Event[]) => set(() => ({ Events: events})),
  fetchEvents: async () =>{ 
    set(() => ({ loadingEvents: false }))
    try{
      const response = (await getUserEvents())
      set(() => ({ Events: response, loadingEvents: false}))
    }
    catch(err){
      console.log(err)
      set(() => ({loadingEvents: false}))
    }
  },


})

export const useBoundStore = create<GroupSlice & TopicSlice & EventSlice>()(
    devtools(  
    persist(
        (...a) => ({
          ...createGroupSlice(...a),
          ...createEventSlice(...a),
          ...createTopicSlice(...a)
        }),
        {
          name: 'bound-storage', // unique name
          getStorage: () => sessionStorage, // (optional) by default, 'localStorage' is used
        }
      )
    )
  )