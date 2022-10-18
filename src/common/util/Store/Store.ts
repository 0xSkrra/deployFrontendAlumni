import create, { StateCreator } from "zustand";
import {devtools, persist} from "zustand/middleware"
import { Group } from "../../interface/Group";
import { Post } from "../../interface/Post";
import { Topic } from "../../interface/Topic";
import { getUserEvents, getUserGroups, getUserTopics } from "../API";
import { EventSlice } from "./Slices/EventSlice";
import { GroupSlice } from "./Slices/GroupSlice";
import { PostSlice } from "./Slices/PostSlice";
import { TopicSlice } from "./Slices/TopicSlice";
import { UserSlice } from "./Slices/UserSlice";


const createTopicSlice: StateCreator<
  TopicSlice & GroupSlice  & EventSlice,
  [["zustand/devtools", never],["zustand/persist", unknown]],
  [],
  TopicSlice
> = (set) => ({
  Topics: [],
  loading: false,
  hasErrors: false,
  addTopic: (newTopic: Topic) => set((state) => ({ Topics: [...state.Topics, newTopic] })),
  removeTopics: () => set(() => ({ Topics: [] })),
  fetch: async () =>{
    set(() => ({ loading: false }))
    try{
      const response = (await getUserTopics())
      set(() => ({ Topics: response, loading: false}))
    }
    catch(err){
      set(() => ({loading: false}))
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
  loading: false,
  hasErrors: false,
  addGroup: (newGroup: Group) => set((state) => ({ Groups: [...state.Groups, newGroup] })),
  removeGroups: () => set(() => ({ Groups: [] })),
  fetch: async () =>{
    set(() => ({ loading: false }))
    try{
      const response = (await getUserGroups())
      set(() => ({ Groups: response, loading: false}))

    }
    catch(err){
      console.log(err)
      set(() => ({loading: false}))
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
  loading: false,
  hasErrors: false,
  addEvent: (newEvent: Event) => set((state) => ({ Events: [...state.Events, newEvent] })),
  removeEvents: () => set(() => ({ Events: [] })),
  fetch: async () =>{ 
    set(() => ({ loading: false }))
    try{
      const response = (await getUserEvents().then((r) => {return r}))
    }
    catch(err){
      console.log(err)
      set(() => ({loading: false}))
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