import create, { StateCreator } from "zustand";
import {devtools, persist} from "zustand/middleware"
import { Group } from "../../interface/Group";
import { Post } from "../../interface/Post";
import { Topic } from "../../interface/Topic";
import { getUserTopics } from "../API";
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
  addTopic: (newTopic: Topic) => set((state) => ({ Topics: [...state.Topics, newTopic] })),
  removeTopics: () => set(() => ({ Topics: [] })),
})

const createGroupSlice: StateCreator<
  GroupSlice & TopicSlice & EventSlice,
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  [],
  GroupSlice
> = (set) => ({
  Groups: [],
  addGroup: (newGroup: Group) => set((state) => ({ Groups: [...state.Groups, newGroup] })),
  removeGroups: () => set(() => ({ Groups: [] })),
})

const createEventSlice: StateCreator<
 EventSlice & GroupSlice & TopicSlice,
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  [],
  EventSlice
> = (set) => ({
  Events: [],
  addEvent: (newEvent: Event) => set((state) => ({ Events: [...state.Events, newEvent] })),
  removeEvents: () => set(() => ({ Events: [] })),
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