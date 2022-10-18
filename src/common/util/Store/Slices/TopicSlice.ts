import { Topic } from "../../../interface/Topic";


export interface TopicSlice{
    Topics: Topic[],
    addTopic: (topic: Topic) => void,
    removeTopics: () => void,
}