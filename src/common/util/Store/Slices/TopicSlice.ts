import { Topic } from "../../../interface/Topic";


export interface TopicSlice{
    Topics: Topic[],
    loadingTopics: false,
    topicsHasErrors: false,
    addTopic: (topic: Topic) => void,
    removeTopics: () => void,
    fetchTopics: () => void
}