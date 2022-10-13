import { Topic } from "../../../interface/Topic";


export interface TopicSlice{
    Topics: Topic[],
    setTopics: (topics: Topic[]) => void,
    removeTopics: () => void,
}