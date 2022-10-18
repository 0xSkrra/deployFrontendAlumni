import { Topic } from "../../../interface/Topic";


export interface TopicSlice{
    Topics: Topic[],
    loading: false,
    hasErrors: false,
    addTopic: (topic: Topic) => void,
    removeTopics: () => void,
    fetch: () => void
}