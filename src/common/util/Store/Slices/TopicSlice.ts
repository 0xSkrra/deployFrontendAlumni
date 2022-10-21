import { Event } from "../../../interface/Event";
import { Post } from "../../../interface/Post";
import { Topic } from "../../../interface/Topic";


export interface TopicSlice{
    Topics: Topic[],
    loadingTopics: false,
    topicsHasErrors: false,
    addTopic: (topic: Topic) => void,
    addPostToTopic: (post: Post) => void,
    addEventToTopic: (event: Event, id: number) => void,
    removeTopics: () => void,
    fetchTopics: () => void
}